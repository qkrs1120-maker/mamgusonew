// =====================================================
// 마음연구소 크레딧 시스템 v2 — 서버(Netlify+Supabase) 기반
// 전략: localStorage 캐시로 즉시 UI 반응 + 서버 동기화로 조작 방지
// =====================================================

const CREDIT_CACHE_KEY   = 'maullab_credits_cache'; // UI용 캐시
const UID_KEY            = 'maullab_uid';            // 고유 익명 ID (쿠키와 무관)
const CREDIT_PER_TEST    = 10;
const CREDIT_PER_SHARE   = 10;
const API_BASE           = '/api';

// ── UID 관리 ──────────────────────────────────────
function generateUID() {
  // crypto.randomUUID 지원 여부 체크 후 폴백
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function getUID() {
  let uid = localStorage.getItem(UID_KEY);
  if (!uid) {
    uid = generateUID();
    localStorage.setItem(UID_KEY, uid);
  }
  return uid;
}

// ── 캐시 읽기 (즉시 반환 — UI 블로킹 없음) ────────
function getCredits() {
  const cached = localStorage.getItem(CREDIT_CACHE_KEY);
  // 캐시가 없으면 서버 초기화 전이므로 100 표시
  return cached !== null ? (parseInt(cached, 10) || 0) : 100;
}

function _setCreditCache(n) {
  const val = Math.max(0, n);
  localStorage.setItem(CREDIT_CACHE_KEY, val);
  return val;
}

// ── 서버 API 호출 헬퍼 ────────────────────────────
async function _apiPost(endpoint, body) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function _apiGet(endpoint, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/${endpoint}?${qs}`);
  return res.json();
}

// ── 초기화: 페이지 로드 시 서버에서 크레딧 동기화 ──
async function initCreditSystem() {
  const uid = getUID();
  try {
    const data = await _apiPost('init-user', { uid });
    if (typeof data.credit === 'number') {
      _setCreditCache(data.credit);
      refreshAllCreditBadges();
      if (data.isNew) {
        // 신규 유저 환영 메시지 (선택)
        setTimeout(() => showWelcomeCreditToast(), 800);
      }
    }
  } catch (e) {
    // 서버 오류 시 캐시 값 그대로 사용 (그레이스풀 디그레이드)
    console.warn('[credits] Server unreachable, using cache:', e.message);
  }
}

// ── 크레딧 차감 (서버 기준 + 낙관적 UI 업데이트) ───
async function deductCredits(amount) {
  const uid = getUID();
  // 낙관적 업데이트: 즉시 UI에 반영
  const optimistic = Math.max(0, getCredits() - amount);
  _setCreditCache(optimistic);
  refreshAllCreditBadges();

  try {
    const data = await _apiPost('deduct-credit', { uid, amount });
    if (typeof data.credit === 'number') {
      // 서버 응답으로 최종 확정
      _setCreditCache(data.credit);
      refreshAllCreditBadges();
      return { ok: true, credit: data.credit };
    }
    if (data.error === 'Insufficient credits') {
      // 서버에서 잔액 부족 확인 → UI 복원
      _setCreditCache(data.credit);
      refreshAllCreditBadges();
      return { ok: false, credit: data.credit, reason: 'insufficient' };
    }
    return { ok: false, reason: data.error };
  } catch (e) {
    // 오프라인: 낙관적 차감 유지 (재연결 시 재동기화)
    console.warn('[credits] Deduct offline, using optimistic:', e.message);
    return { ok: true, credit: optimistic, offline: true };
  }
}

// ── 크레딧 추가 (공유 보상 등) ─────────────────────
async function rewardShare(shareText) {
  const uid = getUID();
  try {
    const data = await _apiPost('add-credit', { uid, amount: CREDIT_PER_SHARE, reason: 'share' });
    if (typeof data.credit === 'number') {
      _setCreditCache(data.credit);
      refreshAllCreditBadges();
      showShareRewardToast(data.added || CREDIT_PER_SHARE);
      return { ok: true, credit: data.credit };
    }
    if (data.error === 'Cooldown active') {
      alert(data.message || '잠시 후 다시 시도해주세요.');
      return { ok: false, reason: 'cooldown' };
    }
    return { ok: false, reason: data.error };
  } catch (e) {
    console.warn('[credits] Share reward offline:', e.message);
    return { ok: false, reason: 'offline' };
  }
}

// 페이지 재방문 시 서버 동기화 (탭 포커스 이벤트)
async function syncCreditsFromServer() {
  const uid = getUID();
  try {
    const data = await _apiGet('get-credit', { uid });
    if (typeof data.credit === 'number') {
      _setCreditCache(data.credit);
      refreshAllCreditBadges();
    }
  } catch (e) { /* 실패 시 캐시 유지 */ }
}

// ── 기존 호환 레이어 (기존 코드 수정 없이 동작) ──────
// setCredits: 즉시 캐시만 업데이트 (서버 동기화는 deductCredits 통해)
function setCredits(n) { _setCreditCache(n); }
function addCredits(n) { /* rewardShare 사용 권장 */ refreshAllCreditBadges(); }

// ── 테스트 비용 차감 래퍼 ──────────────────────────
async function deductTestCredit() {
  if (getCredits() < CREDIT_PER_TEST) return false;
  const result = await deductCredits(CREDIT_PER_TEST);
  return result.ok;
}

// ── UI 헬퍼 ───────────────────────────────────────
function refreshAllCreditBadges() {
  const n = getCredits();
  document.querySelectorAll('[id$="CreditCount"], .credit-badge-count').forEach(el => {
    el.textContent = n;
  });
  document.querySelectorAll('.credit-badge-bar-fill').forEach(el => {
    el.style.width = Math.min(100, n) + '%';
  });
}

function showWelcomeCreditToast() {
  _showToast('🎉 환영해요! 100 크레딧이 지급되었습니다.', '#059669');
}

function showShareRewardToast(amount) {
  _showToast(`🎁 공유 완료! +${amount} 크레딧이 추가되었습니다.`, '#7C3AED');
}

function _showToast(msg, color = '#374151') {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);
    background:${color};color:white;padding:12px 22px;border-radius:50px;
    font-size:0.9rem;font-weight:700;z-index:9999;
    box-shadow:0 4px 20px rgba(0,0,0,0.2);
    opacity:0;transition:all 0.35s ease;pointer-events:none;white-space:nowrap;
  `;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => el.remove(), 400);
  }, 3000);
}

// ── 공유 + 크레딧 연동 ────────────────────────────
function doShare(text) {
  const url = location.href;
  if (navigator.share) {
    navigator.share({ title: '마음연구소', text, url })
      .then(() => rewardShare(text))
      .catch(() => {});
  } else {
    navigator.clipboard?.writeText(url).then(() => rewardShare(text)).catch(() => {
      prompt('링크를 복사하세요:', url);
      rewardShare(text);
    });
  }
}

// ── 크레딧 모달 ───────────────────────────────────
function closeCreditModal() {
  document.getElementById('creditModalOverlay')?.classList.remove('open');
}

// ── 페이지 로드 시 자동 초기화 ────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCreditSystem();
  refreshAllCreditBadges();
  // 탭 포커스 시 서버와 동기화 (다른 기기/탭과 크레딧 싱크)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncCreditsFromServer();
  });
});
