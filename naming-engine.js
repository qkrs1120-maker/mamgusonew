// =====================================================
// 마음연구소 작명 해석 모듈 (naming-engine.js)
// 음오행(音五行) 기반 이름 분석 + 사주 상호작용
// 사주 해석 엔진(credits.js / saju deep analysis)과 완전 호환
// =====================================================

// ── 음오행 데이터 ─────────────────────────────────
// 훈민정음 오음(五音) 기반 초성 → 음오행 매핑
// 아음(牙音) 木: ㄱ ㄲ ㅋ
// 설음(舌音) 火: ㄴ ㄷ ㄸ ㄹ ㅌ
// 순음(脣音) 水: ㅁ ㅂ ㅃ ㅍ
// 치음(齒音) 金: ㅅ ㅆ ㅈ ㅉ ㅊ
// 후음(喉音) 土: ㅇ ㅎ
const CHOSUNG_OHAENG_MAP = {
  0:'목', 1:'목',                         // ㄱ ㄲ
  2:'화', 3:'화', 4:'화', 5:'화',         // ㄴ ㄷ ㄸ ㄹ
  6:'수', 7:'수', 8:'수',                  // ㅁ ㅂ ㅃ
  9:'금', 10:'금',                         // ㅅ ㅆ
  11:'토',                                 // ㅇ
  12:'금', 13:'금', 14:'금',              // ㅈ ㅉ ㅊ
  15:'목',                                 // ㅋ
  16:'화',                                 // ㅌ
  17:'수',                                 // ㅍ
  18:'토',                                 // ㅎ
};

const CHOSUNG_CHARS = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const NE_COLOR  = { 목:'#22C55E', 화:'#EF4444', 토:'#F59E0B', 금:'#A78BFA', 수:'#3B82F6' };
const NE_BG     = { 목:'#F0FDF4', 화:'#FEF2F2', 토:'#FFFBEB', 금:'#F5F3FF', 수:'#EFF6FF' };
const NE_BORDER = { 목:'#86EFAC', 화:'#FECACA', 토:'#FDE68A', 금:'#C4B5FD', 수:'#BFDBFE' };
const NE_LABEL  = { 목:'木(목)', 화:'火(화)', 토:'土(토)', 금:'金(금)', 수:'水(수)' };
const NE_KW     = { 목:['성장','진취','도전','창의'], 화:['열정','존재감','활력','표현'], 토:['안정','신뢰','포용','성실'], 금:['결단','세련','정확','의지'], 수:['지혜','섬세','공감','통찰'] };

// ── 핵심 함수: 한글 자모 분해 ──────────────────────
function _getChosungIdx(char) {
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return -1;
  return Math.floor((code - 0xAC00) / (21 * 28));
}

function getCharSoundOhaeng(char) {
  const idx = _getChosungIdx(char);
  return idx >= 0 ? (CHOSUNG_OHAENG_MAP[idx] || null) : null;
}

// ── 이름 음오행 전체 분석 ──────────────────────────
function analyzeNameOhaeng(name) {
  if (!name || name.trim().length === 0) return null;
  const cleaned = name.replace(/\s/g, '');
  const chars = cleaned.split('').map(c => ({
    char: c,
    chosung: CHOSUNG_CHARS[_getChosungIdx(c)] || '?',
    ohaeng: getCharSoundOhaeng(c),
  })).filter(c => c.ohaeng !== null);

  if (chars.length === 0) return null;

  const count = { 목:0, 화:0, 토:0, 금:0, 수:0 };
  chars.forEach(c => count[c.ohaeng]++);
  const total = chars.length;
  const pct   = {};
  Object.entries(count).forEach(([e, v]) => pct[e] = total > 0 ? Math.round(v / total * 100) : 0);

  const sorted   = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][0];
  const secondary= sorted[1][1] > 0 ? sorted[1][0] : null;

  // 성씨(첫 글자) 오행 / 이름(이하) 오행
  const surnameOhaeng = chars[0]?.ohaeng || null;
  const givenElems    = chars.slice(1).map(c => c.ohaeng).filter(Boolean);

  // 오행 흐름: 연속한 두 글자 상생 여부
  const GEN = { 목:'화', 화:'토', 토:'금', 금:'수', 수:'목' };
  const flowPairs = [];
  for (let i = 0; i < chars.length - 1; i++) {
    const a = chars[i].ohaeng, b = chars[i+1].ohaeng;
    if (!a || !b) continue;
    if (GEN[a] === b)       flowPairs.push({ from: a, to: b, type: 'generate', label: '상생(相生)' });
    else if (GEN[b] === a)  flowPairs.push({ from: a, to: b, type: 'generate', label: '상생(相生)' });
    else if (a === b)       flowPairs.push({ from: a, to: b, type: 'same',     label: '동기(同氣)' });
    else                    flowPairs.push({ from: a, to: b, type: 'neutral',  label: '' });
  }

  return { chars, count, pct, total, dominant, secondary, surnameOhaeng, givenElems, flowPairs };
}

// ── 사주 × 이름 상호작용 분석 ─────────────────────
function analyzeNameSajuInteraction(na, da) {
  // na = analyzeNameOhaeng result
  // da = deepAnalyzeSaju result (from saju.html)
  if (!na || !da) return null;

  const { dominant, secondary, count: nc, pct: np } = na;
  const { yongshin, overElems, underElems, dayMasterElem } = da;
  const GEN  = { 목:'화', 화:'토', 토:'금', 금:'수', 수:'목' };
  const CTRL = { 목:'토', 화:'금', 토:'수', 금:'목', 수:'화' };

  let score = 50; // 기본 점수
  const points = []; // 긍정/부정 포인트 수집

  // 1. 이름 주 오행이 용신인 경우 → 최고의 조합
  if (dominant === yongshin) {
    score += 30;
    points.push({ type: 'best', icon: '⭐', text: `이름의 주 오행(${NE_LABEL[dominant]})이 사주의 용신과 일치합니다. 이름이 사주의 부족한 기운을 자연스럽게 채워주는 매우 이상적인 조합으로 볼 수 있습니다.` });
  } else if (secondary === yongshin) {
    score += 18;
    points.push({ type: 'good', icon: '✅', text: `이름에 용신 오행(${NE_LABEL[yongshin]})이 포함되어 있어, 사주의 부족한 기운을 이름이 부분적으로 보완해주는 편입니다.` });
  }

  // 2. 이름 오행이 사주 부족 오행 보완
  underElems.forEach(e => {
    if (nc[e] > 0) {
      score += 12;
      points.push({ type: 'good', icon: '✅', text: `사주에서 부족한 ${NE_LABEL[e]} 기운을 이름이 보완해주고 있습니다. 이름을 자주 부르고 불릴수록 부족한 기운이 채워지는 느낌을 받을 수 있는 편입니다.` });
    }
  });

  // 3. 이름 오행이 사주 과다 오행을 강화 → 주의 (단정 금지)
  overElems.forEach(e => {
    if (nc[e] > 0 && np[e] >= 50) {
      score -= 15;
      points.push({ type: 'caution', icon: '⚠️', text: `사주에 이미 ${NE_LABEL[e]} 기운이 강한 편인데, 이름에서도 같은 오행이 강조되고 있습니다. 상황에 따라 해당 기운이 과하게 느껴질 수 있는 편으로, 의식적으로 균형을 맞추는 노력이 도움이 될 수 있습니다.` });
    } else if (nc[e] > 0) {
      score -= 5;
    }
  });

  // 4. 이름 오행과 일간(나 자신) 관계
  if (GEN[dominant] === dayMasterElem) {
    score += 10;
    points.push({ type: 'good', icon: '💚', text: `이름 주 오행(${NE_LABEL[dominant]})이 일간을 생해주는 관계입니다. 이름이 나 자신의 에너지를 지지해주는 구조로 볼 수 있어, 자신감과 추진력을 높여주는 편으로 해석됩니다.` });
  } else if (GEN[dayMasterElem] === dominant) {
    score += 6;
    points.push({ type: 'good', icon: '💚', text: `일간 오행이 이름 주 오행을 생해주는 상생 관계입니다. 자연스럽게 이름을 통해 에너지가 흐르는 구조로 볼 수 있습니다.` });
  } else if (CTRL[dominant] === dayMasterElem || CTRL[dayMasterElem] === dominant) {
    score -= 8;
    points.push({ type: 'caution', icon: '💛', text: `이름 오행과 일간 사이에 상극(相剋) 기운이 있습니다. 때때로 이름이 나의 기운과 마찰을 일으키는 느낌을 받을 수 있으나, 균형 잡힌 생활 습관으로 충분히 보완할 수 있는 편입니다.` });
  }

  // 5. 성씨 오행과 이름 오행 조화
  if (na.surnameOhaeng && na.givenElems.length > 0) {
    const givenDom = na.givenElems.reduce((acc, e) => { acc[e] = (acc[e]||0)+1; return acc; }, {});
    const givenTop = Object.entries(givenDom).sort((a,b)=>b[1]-a[1])[0]?.[0];
    if (givenTop && GEN[na.surnameOhaeng] === givenTop) {
      score += 8;
      points.push({ type: 'good', icon: '🌿', text: `성씨 오행(${NE_LABEL[na.surnameOhaeng]})이 이름 오행(${NE_LABEL[givenTop]})을 생해주는 상생 구조입니다. 성씨와 이름이 자연스럽게 흐르는 조화로운 이름 구조로 볼 수 있습니다.` });
    } else if (givenTop && GEN[givenTop] === na.surnameOhaeng) {
      score += 5;
      points.push({ type: 'good', icon: '🌿', text: `이름 오행이 성씨 오행을 뒷받침하는 구조입니다. 이름 전체의 에너지 흐름이 안정적인 편으로 볼 수 있습니다.` });
    }
  }

  score = Math.max(20, Math.min(98, score));

  const scoreLabel =
    score >= 85 ? '매우 좋은 조화 ✨' :
    score >= 70 ? '좋은 조화 👍' :
    score >= 55 ? '무난한 조화 🙂' :
    score >= 40 ? '보완이 필요한 조화 💪' : '주의가 필요한 조화 ⚠️';

  return { score, scoreLabel, points, dominant, yongshin, overElems, underElems };
}

// ── 이름 인상/성격 이미지 문장 ──────────────────────
function generateNameImageText(na, personName) {
  if (!na) return '';
  const { dominant, secondary, surnameOhaeng, givenElems, flowPairs } = na;

  const BASE_IMAGE = {
    목: [`${personName} 님의 이름에서는 성장과 생동감이 느껴지는 편입니다. 진취적이고 도전을 두려워하지 않는 이미지를 주며, 처음 만나는 사람에게도 활기차고 친근한 인상을 줄 수 있습니다.`,
         `이름에서 木 기운이 주를 이루어, 새로운 시작과 가능성을 상징하는 이미지가 강한 편입니다. 꾸준히 성장하는 사람처럼 느껴지는 인상을 주는 이름으로 볼 수 있습니다.`],
    화: [`${personName} 님의 이름에서는 열정과 뚜렷한 존재감이 느껴지는 편입니다. 밝고 활동적인 에너지를 발산하는 이미지로, 어디서든 주목받는 인상을 주는 편입니다.`,
         `이름에서 火 기운이 강하게 느껴져, 카리스마 있고 열정적인 이미지를 주는 편입니다. 주변 사람들에게 활력을 전달하는 이름으로 볼 수 있습니다.`],
    토: [`${personName} 님의 이름에서는 든든하고 믿음직한 안정감이 느껴지는 편입니다. 차분하고 신뢰감 있는 이미지를 주어, 처음 만나는 자리에서도 편안한 인상을 주는 이름입니다.`,
         `이름에서 土 기운이 주를 이루어, 포용력 있고 성실한 이미지를 주는 편입니다. 주변에 안정감을 전달하는 이름으로 볼 수 있습니다.`],
    금: [`${personName} 님의 이름에서는 세련되고 결단력 있는 이미지가 느껴지는 편입니다. 날카로운 인상과 함께 전문적인 능력감을 주어, 사회적으로 신뢰를 쌓기 좋은 이름으로 볼 수 있습니다.`,
         `이름에서 金 기운이 강하게 느껴져, 원칙 있고 의지 강한 이미지를 주는 편입니다. 명확하고 깔끔한 인상을 주는 이름으로 볼 수 있습니다.`],
    수: [`${personName} 님의 이름에서는 지혜롭고 깊이 있는 이미지가 느껴지는 편입니다. 섬세하고 상대방을 잘 배려하는 인상을 주어, 인간관계에서 신뢰를 쌓기 좋은 이름입니다.`,
         `이름에서 水 기운이 주를 이루어, 통찰력 있고 감성적인 이미지를 주는 편입니다. 직관이 뛰어나고 깊이 있는 사람처럼 느껴지는 인상을 줍니다.`],
  };

  let text = (typeof rndPick === 'function' ? rndPick : (a => a[0]))(BASE_IMAGE[dominant] || BASE_IMAGE['토']);

  // 2차 오행 추가 문장
  if (secondary) {
    const SUB_TEXT = {
      목: '여기에 木 기운이 더해져 성장 지향적인 면모도 함께 느껴지는 편입니다.',
      화: '火 기운이 더해져 열정적인 인상이 강조되는 편입니다.',
      토: '土 기운이 더해져 안정적이고 신뢰감 있는 면이 함께 느껴지는 편입니다.',
      금: '金 기운도 있어 세련되고 결단력 있는 인상이 더해지는 편입니다.',
      수: '水 기운이 더해져 감성적이고 깊이 있는 면모도 함께 느껴지는 편입니다.',
    };
    text += ' ' + (SUB_TEXT[secondary] || '');
  }

  // 오행 흐름 (이름 내 상생 여부)
  const hasFlow = flowPairs.some(p => p.type === 'generate');
  if (hasFlow) {
    text += ' 이름 안에서 오행이 서로 생해주는 흐름이 있어, 자연스럽게 에너지가 순환되는 구조로 볼 수 있습니다.';
  }

  return text;
}

// ── 전체 해석 요약 문장 ───────────────────────────
function generateNamingSummaryText(na, interaction, personName, sajuDa) {
  if (!na || !interaction) return '';
  const { score, dominant, yongshin, overElems, underElems } = interaction;

  let summary = '';

  // 조화 수준별 오프닝
  if (score >= 85) {
    summary = `${personName} 님의 이름과 사주는 매우 조화로운 편으로 볼 수 있습니다. 이름이 사주의 부족한 기운을 자연스럽게 채워주어, 이름을 부르고 쓸 때마다 긍정적인 에너지의 흐름이 만들어지는 구조입니다.`;
  } else if (score >= 70) {
    summary = `${personName} 님의 이름과 사주는 전반적으로 좋은 조화를 이루는 편으로 볼 수 있습니다. 이름이 사주를 부분적으로 보완해주는 구조로, 이름을 긍정적으로 활용하면 사주의 흐름이 더 원활해질 수 있습니다.`;
  } else if (score >= 55) {
    summary = `${personName} 님의 이름과 사주는 무난한 조화를 이루는 편입니다. 일부 오행이 충돌하는 면이 있을 수 있지만, 이것이 곧 나쁜 것을 의미하지는 않습니다. 오히려 그 긴장감이 성장의 동력이 되는 경우도 많습니다.`;
  } else {
    summary = `${personName} 님의 이름과 사주 사이에 다소 마찰이 있을 수 있는 구조입니다. 하지만 이름이 사주의 전부를 결정하지는 않습니다. 생활 환경, 의식적인 노력, 좋은 관계가 훨씬 큰 영향을 미칩니다.`;
  }

  // 보완/충돌 핵심 한 문장
  const goodPoints = interaction.points.filter(p => p.type === 'good' || p.type === 'best');
  const cautionPoints = interaction.points.filter(p => p.type === 'caution');

  if (goodPoints.length > 0 && cautionPoints.length === 0) {
    summary += ' 이름이 사주를 보완해주는 부분이 뚜렷하게 나타나며, 이름과 함께하는 삶의 흐름이 자연스럽게 긍정적인 방향으로 기울어지는 편으로 볼 수 있습니다.';
  } else if (cautionPoints.length > 0 && goodPoints.length === 0) {
    summary += ' 이름의 오행이 사주의 과다 기운을 더 강화하는 면이 있을 수 있습니다. 의식적으로 균형을 맞추는 생활 습관을 들이면 이 부분을 자연스럽게 완화할 수 있습니다.';
  } else if (goodPoints.length > 0 && cautionPoints.length > 0) {
    summary += ' 이름과 사주 사이에 보완되는 부분과 주의가 필요한 부분이 함께 존재합니다. 강점을 살리되, 과한 기운이 드러나는 상황에서는 의식적으로 조절하는 자세가 도움이 됩니다.';
  }

  return summary;
}

// ── HTML 렌더링: 이름 오행 그래프 ─────────────────
function buildNameOhaengGraph(na) {
  if (!na) return '';
  const elems = ['목','화','토','금','수'];
  return `
    <div style="margin-bottom:18px;">
      <div style="font-size:0.82rem;font-weight:700;color:#6B7280;margin-bottom:10px;">🎵 음오행(音五行) 분포</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
        ${na.chars.map(c => `
          <div style="text-align:center;min-width:44px;">
            <div style="font-size:1.4rem;font-weight:900;color:${NE_COLOR[c.ohaeng]||'#374151'};">${c.char}</div>
            <div style="font-size:0.65rem;font-weight:700;color:${NE_COLOR[c.ohaeng]||'#9CA3AF'};margin-top:2px;">${c.chosung}</div>
            <div style="font-size:0.62rem;background:${NE_BG[c.ohaeng]||'#F9FAFB'};border:1px solid ${NE_BORDER[c.ohaeng]||'#E5E7EB'};border-radius:6px;padding:1px 5px;margin-top:3px;color:${NE_COLOR[c.ohaeng]||'#374151'};">${c.ohaeng}</div>
          </div>`).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${elems.map(e => `
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:52px;font-size:0.78rem;font-weight:700;color:${NE_COLOR[e]};">${NE_LABEL[e]}</div>
            <div style="flex:1;height:10px;background:#F3F4F6;border-radius:5px;overflow:hidden;">
              <div style="height:100%;width:${na.pct[e]||0}%;background:${NE_COLOR[e]};border-radius:5px;transition:width 1s ease;"></div>
            </div>
            <div style="width:32px;font-size:0.78rem;color:#6B7280;text-align:right;">${na.pct[e]||0}%</div>
            <div style="width:50px;font-size:0.72rem;color:#9CA3AF;">${na.count[e]>0?'✓'.repeat(na.count[e]):''}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

// ── HTML 렌더링: 사주-이름 조화 점수 게이지 ────────
function buildHarmonyGauge(interaction) {
  if (!interaction) return '';
  const { score, scoreLabel } = interaction;
  const barColor = score >= 70 ? 'linear-gradient(90deg,#7C3AED,#4F46E5)' : score >= 50 ? 'linear-gradient(90deg,#F59E0B,#D97706)' : 'linear-gradient(90deg,#EF4444,#DC2626)';
  return `
    <div style="background:var(--gradient-soft,#F9FAFB);border-radius:14px;padding:18px 20px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div style="font-size:0.85rem;font-weight:700;color:#374151;">사주 × 이름 조화 지수</div>
        <div style="font-size:0.8rem;font-weight:700;color:#6B7280;">${scoreLabel}</div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="flex:1;height:12px;background:#E5E7EB;border-radius:6px;overflow:hidden;">
          <div id="harmonyGaugeBar" style="height:100%;width:0%;background:${barColor};border-radius:6px;transition:width 1.2s ease;"></div>
        </div>
        <div style="font-size:2rem;font-weight:900;color:${score>=70?'#7C3AED':score>=50?'#D97706':'#DC2626'};min-width:56px;text-align:right;">${score}<span style="font-size:1rem;">점</span></div>
      </div>
      <div style="font-size:0.78rem;color:#9CA3AF;margin-top:6px;">* 이름 오행과 사주 오행의 상호작용을 수치화한 참고 지표입니다.</div>
    </div>`;
}

// ── 메인 HTML 생성 함수 ────────────────────────────
function buildNamingAnalysisHTML(personName, da) {
  const na          = analyzeNameOhaeng(personName);
  const interaction = analyzeNameSajuInteraction(na, da);

  if (!na) return `
    <div class="result-card">
      <h3>🔤 이름 오행 분석</h3>
      <p style="color:#9CA3AF;font-size:0.9rem;">한글 이름을 입력하면 이름 오행 분석이 가능합니다.</p>
    </div>`;

  const imageText    = generateNameImageText(na, personName);
  const summaryText  = generateNamingSummaryText(na, interaction, personName, da);
  const goodPoints   = interaction ? interaction.points.filter(p => p.type === 'good' || p.type === 'best') : [];
  const cautionPoints= interaction ? interaction.points.filter(p => p.type === 'caution') : [];

  return `
  <div class="result-card">
    <h3>🔤 이름 오행(音五行) 분석</h3>
    <div style="background:linear-gradient(135deg,${NE_BG[na.dominant]},white);border:1px solid ${NE_BORDER[na.dominant]};border-radius:14px;padding:16px 18px;margin-bottom:18px;display:flex;align-items:center;gap:14px;">
      <div style="font-size:2.2rem;">${na.dominant==='목'?'🌱':na.dominant==='화'?'🔥':na.dominant==='토'?'🌍':na.dominant==='금'?'💎':'💧'}</div>
      <div>
        <div style="font-size:0.72rem;font-weight:700;color:#9CA3AF;margin-bottom:2px;">주 오행</div>
        <div style="font-size:1.2rem;font-weight:900;color:${NE_COLOR[na.dominant]};">${NE_LABEL[na.dominant]}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:6px;">
          ${NE_KW[na.dominant].map(k=>`<span style="font-size:0.72rem;background:${NE_BG[na.dominant]};border:1px solid ${NE_BORDER[na.dominant]};border-radius:12px;padding:2px 9px;color:${NE_COLOR[na.dominant]};font-weight:700;">#${k}</span>`).join('')}
        </div>
      </div>
    </div>

    ${buildNameOhaengGraph(na)}

    <!-- 이름 이미지/성격 -->
    <div style="margin-bottom:16px;">
      <div style="font-size:0.82rem;font-weight:700;color:#6B7280;margin-bottom:8px;">✨ 이름이 주는 이미지 & 인상</div>
      <p style="font-size:0.9rem;line-height:1.85;color:#374151;">${imageText}</p>
    </div>

    <!-- 사주-이름 조화 -->
    ${interaction ? `
    <div style="font-size:0.82rem;font-weight:700;color:#6B7280;margin-bottom:8px;margin-top:18px;">🀄 사주와의 조화 분석</div>
    ${buildHarmonyGauge(interaction)}

    <!-- 긍정 포인트 -->
    ${goodPoints.length > 0 ? `
    <div style="margin-bottom:14px;">
      <div style="font-size:0.82rem;font-weight:700;color:#059669;margin-bottom:8px;">🌿 이름이 사주를 보완하는 부분</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${goodPoints.map(p => `
          <div style="display:flex;gap:10px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px 14px;">
            <span style="font-size:1rem;flex-shrink:0;">${p.icon}</span>
            <p style="font-size:0.85rem;line-height:1.7;color:#065F46;margin:0;">${p.text}</p>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <!-- 주의 포인트 -->
    ${cautionPoints.length > 0 ? `
    <div style="margin-bottom:14px;">
      <div style="font-size:0.82rem;font-weight:700;color:#D97706;margin-bottom:8px;">💛 균형이 필요한 부분</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${cautionPoints.map(p => `
          <div style="display:flex;gap:10px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:10px 14px;">
            <span style="font-size:1rem;flex-shrink:0;">${p.icon}</span>
            <p style="font-size:0.85rem;line-height:1.7;color:#78350F;margin:0;">${p.text}</p>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <!-- 전체 해석 요약 -->
    <div style="background:linear-gradient(135deg,#F5F3FF,#EDE9FE);border:1px solid #C4B5FD;border-radius:14px;padding:18px 20px;margin-top:8px;">
      <div style="font-size:0.82rem;font-weight:700;color:#5B21B6;margin-bottom:8px;">📝 전체 해석 요약</div>
      <p style="font-size:0.9rem;line-height:1.85;color:#4C1D95;margin:0;">${summaryText}</p>
    </div>` : ''}

    <p style="font-size:0.75rem;color:#9CA3AF;margin-top:12px;text-align:center;">
      * 음오행은 이름 발음의 초성을 기반으로 분석한 전통 명리학적 참고 자료입니다.
    </p>
  </div>`;
}

// 게이지 애니메이션 (렌더 후 호출)
function animateHarmonyGauge(score) {
  setTimeout(() => {
    const bar = document.getElementById('harmonyGaugeBar');
    if (bar) bar.style.width = score + '%';
  }, 150);
}
