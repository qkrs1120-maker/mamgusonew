// =====================================================
// 마음연구소 크레딧 시스템 v2 — 서버(Vercel+Supabase) 기반
// =====================================================

const CREDIT_CACHE_KEY   = 'maullab_credits_cache';
const UID_KEY            = 'maullab_uid';
const ADMIN_KEY          = 'maullab_admin_mode';
const CREDIT_PER_TEST    = 10;
const CREDIT_PER_SHARE   = 10;
const API_BASE           = '/api';

function isAdminMode() {
  return localStorage.getItem(ADMIN_KEY) === 'true';
}
function disableAdminMode() {
  localStorage.removeItem(ADMIN_KEY);
  _setCreditCache(100);
  refreshAllCreditBadges();
}
function generateUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
function getUID() {
  let uid = localStorage.getItem(UID_KEY);
  if (!uid) { uid = generateUID(); localStorage.setItem(UID_KEY, uid); }
  return uid;
}
function getCredits() {
  if (isAdminMode()) return 99999;
  const cached = localStorage.getItem(CREDIT_CACHE_KEY);
  return cached !== null ? (parseInt(cached, 10) || 0) : 100;
}
function _setCreditCache(n) {
  const val = Math.max(0, n);
  localStorage.setItem(CREDIT_CACHE_KEY, val);
  return val;
}
async function _apiPost(endpoint, body) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}
async function _apiGet(endpoint, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/${endpoint}?${qs}`);
  return res.json();
}
async function initCreditSystem() {
  if (isAdminMode()) { refreshAllCreditBadges(); return; }
  const uid = getUID();
  try {
    const data = await _apiPost('init-user', { uid });
    if (typeof data.credit === 'number') {
      _setCreditCache(data.credit);
      refreshAllCreditBadges();
      if (data.isNew) setTimeout(() => showWelcomeCreditToast(), 800);
    }
  } catch (e) { console.warn('[credits] Server unreachable, using cache:', e.message); }
}
async function deductCredits(amount) {
  if (isAdminMode()) return { ok: true, credit: 99999 };
  const uid = getUID();
  const optimistic = Math.max(0, getCredits() - amount);
  _setCreditCache(optimistic);
  refreshAllCreditBadges();
  try {
    const data = await _apiPost('deduct-credit', { uid, amount });
    if (typeof data.credit === 'number') {
      _setCreditCache(data.credit); refreshAllCreditBadges();
      return { ok: true, credit: data.credit };
    }
    if (data.error === 'Insufficient credits') {
      _setCreditCache(data.credit); refreshAllCreditBadges();
      return { ok: false, credit: data.credit, reason: 'insufficient' };
    }
    return { ok: false, reason: data.error };
  } catch (e) {
    console.warn('[credits] Deduct offline:', e.message);
    return { ok: true, credit: optimistic, offline: true };
  }
}
async function rewardShare(shareText) {
  const uid = getUID();
  try {
    const data = await _apiPost('add-credit', { uid, amount: CREDIT_PER_SHARE, reason: 'share' });
    if (typeof data.credit === 'number') {
      _setCreditCache(data.credit); refreshAllCreditBadges();
      showShareRewardToast(data.added || CREDIT_PER_SHARE);
      return { ok: true, credit: data.credit };
    }
    if (data.error === 'Cooldown active') { alert(data.message || '잠시 후 다시 시도해주세요.'); return { ok: false, reason: 'cooldown' }; }
    return { ok: false, reason: data.error };
  } catch (e) { return { ok: false, reason: 'offline' }; }
}
async function syncCreditsFromServer() {
  if (isAdminMode()) return;
  const uid = getUID();
  try {
    const data = await _apiGet('get-credit', { uid });
    if (typeof data.credit === 'number') { _setCreditCache(data.credit); refreshAllCreditBadges(); }
  } catch (e) {}
}
function setCredits(n) { _setCreditCache(n); }
function addCredits(n) { refreshAllCreditBadges(); }
async function deductTestCredit() {
  if (getCredits() < CREDIT_PER_TEST) return false;
  const result = await deductCredits(CREDIT_PER_TEST);
  return result.ok;
}
function refreshAllCreditBadges() {
  const n = getCredits();
  document.querySelectorAll('[id$="CreditCount"], .credit-badge-count').forEach(el => { el.textContent = n; });
  document.querySelectorAll('.credit-badge-bar-fill').forEach(el => { el.style.width = Math.min(100, n) + '%'; });
}
function showWelcomeCreditToast() { _showToast('🎉 환영해요! 100 크레딧이 지급되었습니다.', '#059669'); }
function showShareRewardToast(amount) { _showToast(`🎁 공유 완료! +${amount} 크레딧이 추가되었습니다.`, '#7C3AED'); }
function _showToast(msg, color = '#374151') {
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:${color};color:white;padding:12px 22px;border-radius:50px;font-size:0.9rem;font-weight:700;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.2);opacity:0;transition:all 0.35s ease;pointer-events:none;white-space:nowrap;`;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(-50%) translateY(10px)'; setTimeout(() => el.remove(), 400); }, 3000);
}
function doShare(text) {
  const url = location.href;
  if (navigator.share) { navigator.share({ title: '마음연구소', text, url }).then(() => rewardShare(text)).catch(() => {}); }
  else { navigator.clipboard?.writeText(url).then(() => rewardShare(text)).catch(() => { prompt('링크를 복사하세요:', url); rewardShare(text); }); }
}
function closeCreditModal() { document.getElementById('creditModalOverlay')?.classList.remove('open'); }
document.addEventListener('DOMContentLoaded', () => {
  initCreditSystem();
  refreshAllCreditBadges();
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') syncCreditsFromServer(); });
});
