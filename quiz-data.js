// =====================================================
// quiz-data.js — 마음연구소 테스트 데이터 & 공통 유틸
// =====================================================

// ===== 카테고리 =====
const CATEGORIES = [
  { id: 'mbti',     emoji: '🔤', name: 'MBTI 유형',    desc: '16가지 성격 유형 완전 분석' },
  { id: 'love',     emoji: '💕', name: '연애 심리',     desc: '나의 연애 패턴과 이상형' },
  { id: 'astro',    emoji: '✨', name: '점성술·별자리',  desc: '별이 말해주는 나의 운명' },
  { id: 'saju',     emoji: '🀄', name: '사주·운세',     desc: '사주로 보는 성격과 운명' },
  { id: 'career',   emoji: '💼', name: '직업·진로',     desc: '적성과 잠재력 발견' },
  { id: 'emotion',  emoji: '🌊', name: '감정·성격',     desc: '내면의 감정 유형 탐구' },
  { id: 'relation', emoji: '🤝', name: '인간관계',      desc: '나의 관계 방식 파악' },
  { id: 'fun',      emoji: '🎉', name: '가볍게 즐기기', desc: '재미있는 성향 테스트' },
];

// ===== 공통 제휴 추천 =====
const DEFAULT_AFFILIATES = [
  {
    emoji: '📖',
    title: '나는 왜 이런 사람일까',
    desc: 'MBTI 완전 정복 가이드북',
    url: '#affiliate-book-1',
  },
  {
    emoji: '🎧',
    title: 'MBTI 심화 온라인 강의',
    desc: '유형별 심리 완전 이해하기',
    url: '#affiliate-course-1',
  },
  {
    emoji: '🧘',
    title: '내면 탐구 일기장',
    desc: '심리 유형 맞춤 자기 성찰 노트',
    url: '#affiliate-item-1',
  },
  {
    emoji: '💌',
    title: '유형별 연애 언어 카드',
    desc: '16유형 관계 가이드',
    url: '#affiliate-item-2',
  },
];

// ===== 기본 결과 (폴백) =====
const DEFAULT_RESULT = {
  type: 'INFP',
  emoji: '🌸',
  title: '몽상가형',
  subtitle: '깊은 감수성과 이상을 향한 끝없는 열정을 가진 유형',
  keywords: ['감성적', '이상주의', '창의력', '공감 능력', '내면 세계'],
  description:
    '당신은 풍부한 내면 세계를 가진 몽상가입니다. 타인의 감정을 누구보다 잘 이해하고, ' +
    '이상적인 세상을 꿈꾸며 그것을 향해 나아갑니다. 혼자만의 시간을 통해 에너지를 충전하고, ' +
    '예술이나 문학처럼 감성적인 분야에서 탁월한 능력을 발휘합니다.',
  traits: [
    { label: '감수성',   value: 92 },
    { label: '창의력',   value: 88 },
    { label: '공감 능력',value: 85 },
    { label: '이상주의', value: 90 },
    { label: '독립성',   value: 78 },
  ],
  strengths: [
    '깊은 공감 능력으로 타인의 마음을 잘 이해해요',
    '독창적인 아이디어와 창의적 표현이 뛰어나요',
    '강한 가치관과 신념을 가지고 행동해요',
    '혼자서도 의미 있는 시간을 보낼 줄 알아요',
  ],
  growthPoints: [
    '현실적인 목표 설정과 실행력을 키워보세요',
    '감정에 너무 몰입하지 않도록 거리두기를 연습하세요',
    '자신의 필요를 더 솔직하게 표현해보세요',
    '완벽주의보다는 "충분히 좋은 것"을 인정하는 연습을 해보세요',
  ],
  compatibility: [
    { emoji: '💚', type: 'ENFJ', relation: '최고의 파트너', desc: '서로를 깊이 이해하고 성장시키는 이상적인 조합' },
    { emoji: '💙', type: 'INTJ', relation: '잘 맞는 유형',  desc: '서로 다른 방식으로 세상을 바라보며 균형을 이뤄요' },
    { emoji: '🧡', type: 'ESTJ', relation: '노력 필요',     desc: '가치관 차이가 있지만 서로에게서 배울 점이 많아요' },
  ],
  affiliates: DEFAULT_AFFILIATES,
};

// ===== 테스트 목록 =====
const TESTS = [

  // -------- MBTI 계열 --------
  {
    id: 'mbti-full',
    cat: 'mbti',
    emoji: '🔮',
    title: '나의 진짜 MBTI는?',
    desc: '12분 만에 완성하는 정밀 MBTI 유형 검사. 가장 정확하다고 소문난 바로 그 테스트.',
    longDesc: '총 60문항의 정밀 심리 검사로 나의 진짜 MBTI 유형을 알아보세요. 단순한 결과가 아닌, 인지 기능 분석과 함께 내가 왜 이런 행동을 하는지 깊이 이해할 수 있습니다.',
    badge: 'MBTI', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)',
    time: '약 12분', questions: 60,
    participants: 892341,
    isHot: true, isNew: false,
    quiz: generateMbtiQuiz(),
    results: generateMbtiResults(),
  },
  {
    id: 'mbti-quick',
    cat: 'mbti',
    emoji: '⚡',
    title: '5분 빠른 MBTI 체크',
    desc: '12문항으로 핵심 유형만 빠르게 확인. 바쁜 당신을 위한 초스피드 테스트.',
    badge: 'MBTI', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
    time: '약 5분', questions: 12,
    participants: 421087,
    isHot: true, isNew: false,
    quiz: generateQuickQuiz('mbti'),
    results: generateMbtiResults(),
  },
  {
    id: 'mbti-dark',
    cat: 'mbti',
    emoji: '🌑',
    title: 'MBTI 그림자 유형 테스트',
    desc: '평소엔 감추는 나의 어두운 면, 숨겨진 성격 유형을 파헤칩니다.',
    badge: 'MBTI', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#1F2937,#374151)',
    time: '약 8분', questions: 24,
    participants: 256890,
    isHot: false, isNew: true,
    quiz: generateQuickQuiz('shadow'),
    results: generateShadowResults(),
  },

  // -------- 연애 계열 --------
  {
    id: 'love-style',
    cat: 'love',
    emoji: '💘',
    title: '나의 연애 유형 테스트',
    desc: '내가 연애에서 취하는 패턴, 이상형, 그리고 연애할 때 숨기는 진짜 모습.',
    longDesc: '당신은 연애에서 어떤 사람인가요? 24가지 질문으로 연애 패턴, 애착 유형, 갈등 방식을 심층 분석합니다.',
    badge: '연애', badgeColor: 'pink',
    thumbBg: 'linear-gradient(135deg,#FCE7F3,#FBCFE8)',
    time: '약 7분', questions: 24,
    participants: 654290,
    isHot: true, isNew: false,
    quiz: generateQuickQuiz('love'),
    results: generateLoveResults(),
  },
  {
    id: 'attachment-style',
    cat: 'love',
    emoji: '🫶',
    title: '나의 애착 유형은?',
    desc: '안정형? 불안형? 회피형? 관계 속 나의 진짜 애착 패턴을 확인하세요.',
    badge: '연애', badgeColor: 'pink',
    thumbBg: 'linear-gradient(135deg,#FDF2F8,#FCE7F3)',
    time: '약 6분', questions: 20,
    participants: 387521,
    isHot: false, isNew: true,
    quiz: generateQuickQuiz('attachment'),
    results: generateAttachmentResults(),
  },
  {
    id: 'love-language',
    cat: 'love',
    emoji: '💌',
    title: '나의 사랑의 언어 테스트',
    desc: '5가지 사랑의 언어 중 내가 받고 싶은 사랑의 방식을 알아보세요.',
    badge: '연애', badgeColor: 'pink',
    thumbBg: 'linear-gradient(135deg,#FFF1F2,#FFE4E6)',
    time: '약 5분', questions: 16,
    participants: 298456,
    isHot: false, isNew: false,
    quiz: generateQuickQuiz('language'),
    results: generateLoveLanguageResults(),
  },

  // -------- 직업·진로 --------
  {
    id: 'work-style',
    cat: 'career',
    emoji: '🚀',
    title: '나의 업무 스타일 테스트',
    desc: '팀에서 내가 맡는 역할, 일하는 방식, 그리고 나에게 맞는 직종까지.',
    badge: '진로', badgeColor: 'blue',
    thumbBg: 'linear-gradient(135deg,#DBEAFE,#BFDBFE)',
    time: '약 8분', questions: 24,
    participants: 334521,
    isHot: false, isNew: true,
    quiz: generateQuickQuiz('work'),
    results: generateWorkResults(),
  },
  {
    id: 'hidden-talent',
    cat: 'career',
    emoji: '💎',
    title: '숨겨진 재능 발견 테스트',
    desc: '아직 발휘하지 못한 나의 잠재력과 천재성을 발굴하는 테스트.',
    badge: '진로', badgeColor: 'blue',
    thumbBg: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)',
    time: '약 10분', questions: 30,
    participants: 421087,
    isHot: true, isNew: false,
    quiz: generateQuickQuiz('talent'),
    results: generateTalentResults(),
  },

  // -------- 감정·성격 --------
  {
    id: 'emotional-age',
    cat: 'emotion',
    emoji: '🌱',
    title: '나의 정서 나이는?',
    desc: '실제 나이와 다른 내 감정의 성숙도. 정서 나이로 나를 이해해보세요.',
    badge: '감정', badgeColor: 'green',
    thumbBg: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)',
    time: '약 6분', questions: 18,
    participants: 287654,
    isHot: false, isNew: true,
    quiz: generateQuickQuiz('emotion'),
    results: generateEmotionResults(),
  },
  {
    id: 'stress-type',
    cat: 'emotion',
    emoji: '🌀',
    title: '나의 스트레스 유형 테스트',
    desc: '스트레스를 받을 때 나는 어떻게 반응할까? 나만의 스트레스 관리법 발견.',
    badge: '감정', badgeColor: 'green',
    thumbBg: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)',
    time: '약 7분', questions: 20,
    participants: 198432,
    isHot: false, isNew: true,
    quiz: generateQuickQuiz('stress'),
    results: generateStressResults(),
  },

  // -------- 인간관계 --------
  {
    id: 'social-type',
    cat: 'relation',
    emoji: '🌐',
    title: '나의 사회적 유형 테스트',
    desc: '모임에서 내가 차지하는 역할, 친구를 사귀는 방식, 나의 사회성 점수.',
    badge: '인간관계', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#FEF9C3,#FEF08A)',
    time: '약 7분', questions: 22,
    participants: 245871,
    isHot: false, isNew: false,
    quiz: generateQuickQuiz('social'),
    results: generateSocialResults(),
  },

  // -------- 점성술·별자리 --------
  {
    id: 'zodiac-personality',
    cat: 'astro',
    emoji: '⭐',
    title: '별자리로 보는 나의 성격',
    desc: '12별자리가 말해주는 진짜 내 성격. 태어난 날이 나를 결정한다?',
    longDesc: '태어난 달의 별자리는 성격과 운명에 어떤 영향을 줄까요? 서양 점성술 기반으로 나의 핵심 기질과 잠재력을 분석합니다.',
    badge: '별자리', badgeColor: 'blue',
    thumbBg: 'linear-gradient(135deg,#1a1a3e,#3d1a78)',
    time: '약 5분', questions: 14,
    participants: 312450,
    isHot: true, isNew: false,
    quiz: generateAstroQuiz(),
    results: generateZodiacResults(),
  },
  {
    id: 'zodiac-love',
    cat: 'astro',
    emoji: '💫',
    title: '별자리 궁합 테스트',
    desc: '우리 둘의 별자리 궁합은 몇 점? 운명적인 만남인지 아닌지 확인해봐.',
    badge: '별자리', badgeColor: 'blue',
    thumbBg: 'linear-gradient(135deg,#0f0c29,#302b63)',
    time: '약 4분', questions: 12,
    participants: 487231,
    isHot: true, isNew: false,
    quiz: generateAstroLoveQuiz(),
    results: generateZodiacLoveResults(),
  },
  {
    id: 'mbti-astro',
    cat: 'astro',
    emoji: '🌌',
    title: 'MBTI × 별자리 조합 분석',
    desc: 'MBTI 유형과 별자리가 만나면? 나만의 우주적 성격 조합을 발견해봐.',
    badge: '별자리', badgeColor: 'blue',
    thumbBg: 'linear-gradient(135deg,#0a0a2e,#1a0a3e)',
    time: '약 6분', questions: 16,
    participants: 198654,
    isHot: false, isNew: true,
    quiz: generateMbtiAstroQuiz(),
    results: generateMbtiAstroResults(),
  },
  {
    id: 'tarot-today',
    cat: 'astro',
    emoji: '🃏',
    title: '오늘의 타로 카드',
    desc: '오늘 하루 나에게 필요한 메시지. 타로가 전하는 오늘의 에너지.',
    badge: '타로', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#1a0533,#4a0e6e)',
    time: '약 1분', questions: 1,
    participants: 563210,
    isHot: true, isNew: false,
    link: 'tarot.html?type=today',
  },
  {
    id: 'tarot-love',
    cat: 'astro',
    emoji: '💕',
    title: '타로로 보는 연애운',
    desc: '지금 내 연애의 흐름은? 타로 카드 한 장이 말해주는 연애의 방향.',
    badge: '타로', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#2a0a2e,#6e0e4a)',
    time: '약 1분', questions: 1,
    participants: 487231,
    isHot: true, isNew: false,
    link: 'tarot.html?type=love',
  },
  {
    id: 'tarot-crush',
    cat: 'astro',
    emoji: '💘',
    title: '타로로 보는 짝사랑 성공률',
    desc: '그 사람이 나를 좋아할까? 타로 카드가 솔직하게 알려드려요.',
    badge: '타로', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#2a0a1e,#6e1a4a)',
    time: '약 1분', questions: 1,
    participants: 312450,
    isHot: false, isNew: true,
    link: 'tarot.html?type=crush',
  },
  {
    id: 'tarot-monthly',
    cat: 'astro',
    emoji: '📅',
    title: '타로로 보는 이번 달 운세',
    desc: '이번 달 나에게 다가오는 기회와 주의할 점. 한 달 흐름을 타로로.',
    badge: '타로', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#0a1a2e,#0e3a6e)',
    time: '약 1분', questions: 1,
    participants: 198654,
    isHot: false, isNew: true,
    link: 'tarot.html?type=monthly',
  },
  {
    id: 'tarot-reunion',
    cat: 'astro',
    emoji: '🔄',
    title: '타로로 보는 재회운',
    desc: '헤어진 그 사람과 다시 만날 수 있을까? 타로 카드에게 솔직히 물어봐.',
    badge: '타로', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#1a0a3e,#3a0e6e)',
    time: '약 1분', questions: 1,
    participants: 156430,
    isHot: false, isNew: true,
    link: 'tarot.html?type=reunion',
  },

  // -------- 사주·운세 --------
  {
    id: 'saju-personality',
    cat: 'saju',
    emoji: '🀄',
    title: '사주로 보는 나의 성격',
    desc: '태어난 년·월·일·시로 분석하는 나의 타고난 기질과 성격의 뿌리.',
    longDesc: '한국 전통 사주 명리학을 바탕으로 나의 타고난 기질, 강점, 약점을 분석합니다. 오행(木火土金水)의 균형으로 나를 이해해보세요.',
    badge: '사주', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#1a0a00,#4a2800)',
    time: '약 7분', questions: 20,
    participants: 421876,
    isHot: true, isNew: false,
    quiz: generateSajuQuiz(),
    results: generateSajuResults(),
  },
  {
    id: 'saju-love',
    cat: 'saju',
    emoji: '🧧',
    title: '사주 궁합 테스트',
    desc: '우리 사주가 잘 맞을까? 음양오행으로 보는 두 사람의 인연.',
    badge: '사주', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#2a0a00,#6a1800)',
    time: '약 6분', questions: 16,
    participants: 334590,
    isHot: false, isNew: true,
    quiz: generateSajuLoveQuiz(),
    results: generateSajuLoveResults(),
  },
  {
    id: 'ohaeng-type',
    cat: 'saju',
    emoji: '☯️',
    title: '나의 오행 기질 테스트',
    desc: '목·화·토·금·수 중 나는 어떤 기운이 강한 사람일까?',
    badge: '사주', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#0a1a00,#1a3d00)',
    time: '약 8분', questions: 24,
    participants: 267430,
    isHot: false, isNew: true,
    quiz: generateOhaengQuiz(),
    results: generateOhaengResults(),
  },
  {
    id: 'today-fortune',
    cat: 'fun',
    emoji: '🎴',
    title: '오늘의 운세 테스트',
    desc: '오늘 하루 내 운세는? 연애운·금전운·건강운 모두 확인해봐.',
    badge: '운세', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#1a1000,#3d2800)',
    time: '약 4분', questions: 10,
    participants: 789234,
    isHot: true, isNew: false,
    quiz: generateFortuneQuiz(),
    results: generateFortuneResults(),
  },

  // -------- 가볍게 즐기기 --------
  {
    id: 'food-mbti',
    cat: 'fun',
    emoji: '🍕',
    title: '음식으로 보는 나의 성격',
    desc: '내가 좋아하는 음식이 성격을 말해준다? 재미있는 음식 성격 유형 테스트.',
    badge: '재미', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)',
    time: '약 3분', questions: 10,
    participants: 523091,
    isHot: true, isNew: false,
    quiz: generateQuickQuiz('food'),
    results: generateFunResults('food'),
  },
  {
    id: 'animal-type',
    cat: 'fun',
    emoji: '🦊',
    title: '내가 동물이라면?',
    desc: '성격으로 알아보는 나의 동물 유형. 당신은 어떤 동물을 닮았나요?',
    badge: '재미', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
    time: '약 4분', questions: 12,
    participants: 678432,
    isHot: true, isNew: false,
    quiz: generateQuickQuiz('animal'),
    results: generateFunResults('animal'),
  },

  // -------- 신규: 연애 / 인간관계 --------
  {
    id: 'miss-me',
    cat: 'love',
    emoji: '💭',
    title: '그 사람이 나를 그리워할까?',
    desc: '헤어졌거나 연락이 끊긴 그 사람, 지금 내 생각을 하고 있을까? 심리학적으로 분석해드립니다.',
    longDesc: '관계의 끝 또는 멀어진 거리 속에서 상대가 나를 그리워하는지 심리적으로 분석합니다. 애착 이론과 관계 심리학을 기반으로 한 12문항 테스트입니다.',
    badge: '연애', badgeColor: 'pink',
    thumbBg: 'linear-gradient(135deg,#FDE8F0,#FCE7F3)',
    time: '약 4분', questions: 12,
    participants: 312800,
    isHot: true, isNew: true,
    quiz: generateMissMeQuiz(),
    results: generateMissMeResults(),
  },
  {
    id: 'workplace-relation',
    cat: 'relation',
    emoji: '🏢',
    title: '직장 동료와의 관계 분석',
    desc: '우리 사주로 보는 직장 동료와의 궁합. 상대방 생년월일을 입력하면 관계를 분석해드려요.',
    longDesc: '나와 직장 동료의 생년월일을 기반으로 오행(五行) 관계를 분석합니다. 협력 가능성, 갈등 요인, 함께 잘 일할 수 있는 방법을 알아보세요.',
    badge: '인간관계', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)',
    time: '약 5분', questions: 10,
    participants: 98400,
    isHot: false, isNew: true,
    requiresBirth: true,
    link: 'relation-saju.html?type=workplace',
    quiz: generateRelationQuiz('workplace'),
    results: generateRelationResults('workplace'),
  },
  {
    id: 'family-future',
    cat: 'relation',
    emoji: '👨‍👩‍👧',
    title: '가족과 앞으로 어떻게 될까?',
    desc: '가족 구성원의 생년월일로 보는 우리 가족의 인연과 앞으로의 관계. 사주 오행으로 분석해드려요.',
    longDesc: '가족 간의 오행 에너지 흐름을 분석하여 관계의 강점과 개선점을 알아봅니다. 부모·자녀·형제 관계 모두 분석 가능합니다.',
    badge: '인간관계', badgeColor: 'yellow',
    thumbBg: 'linear-gradient(135deg,#FEF9C3,#FDE68A)',
    time: '약 5분', questions: 10,
    participants: 76500,
    isHot: false, isNew: true,
    requiresBirth: true,
    link: 'relation-saju.html?type=family',
    quiz: generateRelationQuiz('family'),
    results: generateRelationResults('family'),
  },
  {
    id: 'mbti-animal',
    cat: 'mbti',
    emoji: '🦊',
    title: 'MBTI로 보는 내 동물 유형',
    desc: '나와 가장 닮은 동물은? 고양이·강아지·여우·사자·돌고래·올빼미·곰·늑대 중 내 MBTI 동물 유형을 찾아보세요!',
    longDesc: '성향 질문 10개로 나의 MBTI 동물 캐릭터를 분석해요. SNS에 공유하고 친구들이랑 비교해봐요!',
    badge: 'MBTI', badgeColor: 'purple',
    thumbBg: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)',
    time: '3분', questions: 10,
    participants: 42100,
    isHot: true, isNew: true,
    requiresBirth: false,
    quiz: generateMbtiAnimalQuiz(),
    results: generateMbtiAnimalResults(),
  },
  {
    id: 'crush-success',
    cat: 'love',
    emoji: '💘',
    title: '짝사랑 성공률 테스트',
    desc: '내 짝사랑, 과연 이루어질 수 있을까? 10가지 질문으로 상대방의 마음과 성공 가능성을 분석해드려요.',
    longDesc: '상대방과의 관계 거리, 반응 신호, 공통점 등을 종합 분석해 짝사랑 성공 퍼센트를 알려드려요.',
    badge: '연애심리', badgeColor: 'pink',
    thumbBg: 'linear-gradient(135deg,#FFF0F6,#FCE7F3)',
    time: '2분', questions: 10,
    participants: 58300,
    isHot: true, isNew: true,
    requiresBirth: false,
    quiz: generateCrushQuiz(),
    results: generateCrushResults(),
  },
];

// ===== 테스트 카드 렌더링 공통 함수 =====
function renderTestCard(test, isHot) {
  if (!test) return '';
  const fmtParticipants = test.participants >= 10000
    ? Math.floor(test.participants / 10000) + '만+'
    : test.participants.toLocaleString();

  // 사주·운세 카테고리는 생년월일 입력 페이지(saju.html)로 연결
  const isSajuType = test.cat === 'saju' || test.id === 'today-fortune' || test.id === 'workplace-relation' || test.id === 'family-future';
  const isTarot    = !!test.link;
  const href = isTarot ? test.link : (isSajuType ? 'saju.html' : `test.html?id=${test.id}`);
  const inputBadge = isTarot
    ? '<span style="display:inline-flex;align-items:center;gap:3px;background:#EDE9FE;color:#5B21B6;padding:2px 8px;border-radius:5px;font-size:0.68rem;font-weight:700;margin-top:6px;">🃏 카드 직접 뽑기</span>'
    : (isSajuType ? '<span style="display:inline-flex;align-items:center;gap:3px;background:#FEF3C7;color:#92400E;padding:2px 8px;border-radius:5px;font-size:0.68rem;font-weight:700;margin-top:6px;">🗓️ 생년월일 입력</span>' : '');

  return `
    <a href="${href}" class="card test-card" style="text-decoration:none;position:relative;">
      ${isHot ? '<span class="popular-tag">🔥 인기</span>' : ''}
      ${test.isNew ? '<span class="popular-tag" style="background:var(--accent);color:white;">✨ NEW</span>' : ''}
      <div class="test-card-thumb" style="background:${test.thumbBg || 'var(--gradient-soft)'};">
        ${test.emoji}
      </div>
      <div class="card-body" style="padding:20px;">
        <div class="test-card-meta">
          <span class="badge badge-${test.badgeColor}">${test.badge}</span>
          <span class="test-count">⏱ ${test.time}</span>
        </div>
        <h3>${test.title}</h3>
        <p>${test.desc}</p>
        ${inputBadge}
      </div>
      <div class="test-card-footer">
        <span class="test-stat">👥 <span>${fmtParticipants}명 참여</span></span>
        <span style="font-size:0.8rem;color:var(--primary);font-weight:600;">${isSajuType ? '입력하기 →' : '시작하기 →'}</span>
      </div>
    </a>
  `;
}

// =====================================================
// QUIZ 생성 함수들 (각 테스트의 실제 문항)
// =====================================================

function generateMbtiQuiz() {
  return [
    {
      question: '파티나 모임이 끝난 후 나는 보통...',
      options: [
        { text: '에너지가 충전된 느낌이에요. 더 놀고 싶어요!', type: 'E' },
        { text: '피곤하고 혼자만의 시간이 간절해요.', type: 'I' },
      ]
    },
    {
      question: '새로운 정보를 접할 때 나는...',
      options: [
        { text: '구체적인 사실과 세부 내용에 집중해요.', type: 'S' },
        { text: '전체적인 패턴과 가능성을 먼저 떠올려요.', type: 'N' },
      ]
    },
    {
      question: '중요한 결정을 내릴 때...',
      options: [
        { text: '논리적으로 분석하고 가장 합리적인 선택을 해요.', type: 'T' },
        { text: '관련된 사람들의 감정과 가치를 고려해요.', type: 'F' },
      ]
    },
    {
      question: '하루 일과를 계획할 때...',
      options: [
        { text: '미리 계획을 세우고 그대로 실행하는 걸 좋아해요.', type: 'J' },
        { text: '즉흥적으로 흘러가는 것을 선호해요.', type: 'P' },
      ]
    },
    {
      question: '친한 친구들에게 나는...',
      options: [
        { text: '외향적이고 활발한 사람으로 알려져 있어요.', type: 'E' },
        { text: '조용하고 신중한 사람으로 알려져 있어요.', type: 'I' },
      ]
    },
    {
      question: '문제를 해결할 때 나는...',
      options: [
        { text: '검증된 방법과 경험을 활용해요.', type: 'S' },
        { text: '새로운 방식과 창의적인 해결책을 시도해요.', type: 'N' },
      ]
    },
    {
      question: '누군가 고민을 털어놓을 때...',
      options: [
        { text: '현실적인 해결책을 찾아주려 해요.', type: 'T' },
        { text: '먼저 공감해주고 위로해요.', type: 'F' },
      ]
    },
    {
      question: '여행 계획을 세울 때...',
      options: [
        { text: '일정, 숙소, 맛집을 미리 다 예약해요.', type: 'J' },
        { text: '대략적인 방향만 정하고 즉흥적으로 결정해요.', type: 'P' },
      ]
    },
    {
      question: '혼자 있는 시간이 늘어나면...',
      options: [
        { text: '심심하고 사람들이 보고 싶어져요.', type: 'E' },
        { text: '편안하고 오히려 에너지가 차오르는 느낌이에요.', type: 'I' },
      ]
    },
    {
      question: '아이디어를 낼 때 나는...',
      options: [
        { text: '현실적이고 실현 가능한 아이디어를 선호해요.', type: 'S' },
        { text: '엉뚱하더라도 창의적인 아이디어를 즐겨요.', type: 'N' },
      ]
    },
    {
      question: '갈등 상황에서 나는...',
      options: [
        { text: '감정보다 사실과 논리에 기반해 해결해요.', type: 'T' },
        { text: '상대방의 기분을 먼저 살피고 배려해요.', type: 'F' },
      ]
    },
    {
      question: '프로젝트를 진행할 때...',
      options: [
        { text: '단계별로 계획하고 마감 전에 끝내요.', type: 'J' },
        { text: '마감이 다가올수록 집중력이 올라가요.', type: 'P' },
      ]
    },
  ];
}

function generateMbtiResults() {
  return [
    {
      type: 'INFP', emoji: '🌸',
      title: '몽상가형',
      subtitle: '이상을 향해 조용히 타오르는 내면의 불꽃',
      keywords: ['감수성', '이상주의', '창의력', '공감', '독립적'],
      description: '당신은 풍부한 내면 세계를 가진 몽상가입니다. 타인의 감정을 누구보다 깊이 이해하며, 진정성 있는 관계를 추구합니다. 예술, 글쓰기, 상담 등 창의적이고 의미 있는 분야에서 빛을 발합니다.',
      traits: [
        { label: '감수성', value: 92 }, { label: '창의력', value: 88 },
        { label: '공감 능력', value: 85 }, { label: '이상주의', value: 90 },
      ],
      strengths: ['깊은 공감 능력', '독창적인 아이디어', '강한 가치관', '진정성 있는 관계'],
      growthPoints: ['현실적 목표 설정', '감정 거리두기 연습', '자기 표현 늘리기', '완벽주의 내려놓기'],
      compatibility: [
        { emoji: '💚', type: 'ENFJ', relation: '최고의 파트너', desc: '서로를 깊이 이해하고 성장시키는 최상의 조합' },
        { emoji: '🧡', type: 'ESTJ', relation: '노력 필요', desc: '가치관 차이가 있지만 서로에게서 배울 점이 많아요' },
      ],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'ENFJ', emoji: '🌟',
      title: '언변가형',
      subtitle: '사람들에게 영감을 불어넣는 천생 리더',
      keywords: ['카리스마', '공감', '리더십', '따뜻함', '사교적'],
      description: '당신은 타고난 리더입니다. 사람들의 잠재력을 알아보고 그것을 끌어내는 능력이 탁월합니다. 팀을 이끌고 공동체를 위한 일에서 큰 만족을 느낍니다.',
      traits: [
        { label: '리더십', value: 94 }, { label: '공감 능력', value: 91 },
        { label: '사교성', value: 89 }, { label: '결단력', value: 82 },
      ],
      strengths: ['탁월한 리더십', '강한 공감 능력', '사람들을 이끄는 능력', '따뜻한 카리스마'],
      growthPoints: ['자신의 필요도 챙기기', '과도한 희생 줄이기', '비판에 덜 예민해지기', '경계선 설정하기'],
      compatibility: [
        { emoji: '💚', type: 'INFP', relation: '최고의 파트너', desc: '서로의 가치관을 존중하며 깊이 연결되는 조합' },
        { emoji: '💙', type: 'INTJ', relation: '좋은 파트너', desc: '서로의 약점을 보완하는 균형 잡힌 관계' },
      ],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'INTJ', emoji: '🔭',
      title: '전략가형',
      subtitle: '미래를 설계하는 고독한 천재',
      keywords: ['전략적', '독립적', '분석적', '완벽주의', '비전'],
      description: '당신은 독립적이고 전략적인 사고를 가진 유형입니다. 장기적인 목표를 세우고 체계적으로 실행하는 능력이 탁월합니다. 지식 습득과 깊은 이해를 통해 전문성을 키워나갑니다.',
      traits: [
        { label: '전략적 사고', value: 96 }, { label: '독립성', value: 93 },
        { label: '분석력', value: 91 }, { label: '결단력', value: 87 },
      ],
      strengths: ['뛰어난 전략적 사고', '높은 독립심', '깊은 분석 능력', '명확한 비전'],
      growthPoints: ['감정 표현 연습하기', '타인 의견 수용하기', '완벽주의 조절하기', '팀워크 능력 키우기'],
      compatibility: [
        { emoji: '💚', type: 'ENFP', relation: '이상적인 파트너', desc: '서로 다른 매력으로 빈틈을 채워주는 관계' },
        { emoji: '💙', type: 'ENTJ', relation: '잘 맞는 유형', desc: '같은 목표를 향해 나아가는 강력한 팀' },
      ],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateQuickQuiz(type) {
  const baseQuestions = {
    love: [
      { question: '연인이 연락이 늦을 때 나는...', options: [{ text: '불안하고 자꾸 확인하게 돼요', type: 'ANXIOUS' }, { text: '바쁜가 보다, 나중에 보겠지', type: 'SECURE' }] },
      { question: '연인과 다툰 후 나는...', options: [{ text: '빨리 화해하고 싶어서 먼저 연락해요', type: 'ANXIOUS' }, { text: '혼자 감정을 정리하는 시간이 필요해요', type: 'AVOIDANT' }] },
      { question: '연애할 때 가장 중요하게 생각하는 것은?', options: [{ text: '함께하는 시간과 스킨십', type: 'ANXIOUS' }, { text: '서로의 독립성 존중', type: 'SECURE' }] },
      { question: '이상형을 고를 때 가장 먼저 보는 것은?', options: [{ text: '외모와 첫인상', type: 'ANXIOUS' }, { text: '가치관과 성격', type: 'SECURE' }] },
      { question: '연애 중 가장 힘든 순간은?', options: [{ text: '상대가 나를 멀리하는 느낌이 들 때', type: 'ANXIOUS' }, { text: '내 공간과 시간이 침해받을 때', type: 'AVOIDANT' }] },
      { question: '연인에게 기대하는 것은?', options: [{ text: '항상 내 편이 되어주는 것', type: 'ANXIOUS' }, { text: '나를 이해하고 존중해주는 것', type: 'SECURE' }] },
    ],
    shadow: [
      { question: '화가 났을 때 나는...', options: [{ text: '속으로만 삭히고 표현하지 않아요', type: 'SHADOW_I' }, { text: '감정이 바로 밖으로 표출돼요', type: 'SHADOW_E' }] },
      { question: '스트레스를 받으면...', options: [{ text: '평소와 달리 통제 불능 상태가 돼요', type: 'SHADOW_T' }, { text: '극단적으로 예민해지거나 무감각해져요', type: 'SHADOW_F' }] },
      { question: '아무도 모르는 나의 모습은?', options: [{ text: '사실 혼자 있는 걸 즐기는 면이 있어요', type: 'SHADOW_I' }, { text: '사람들과 어울리고 싶은 욕구가 있어요', type: 'SHADOW_E' }] },
      { question: '위기 상황에서 나는...', options: [{ text: '평소보다 더 충동적으로 행동해요', type: 'SHADOW_P' }, { text: '너무 경직되어 아무것도 못 해요', type: 'SHADOW_J' }] },
    ],
    attachment: [
      { question: '가까운 사람이 떠날까 봐 걱정될 때...', options: [{ text: '자주 연락하고 확인하게 돼요', type: 'ANXIOUS' }, { text: '그냥 걱정은 되지만 믿고 기다려요', type: 'SECURE' }, { text: '오히려 거리를 두게 돼요', type: 'AVOIDANT' }] },
      { question: '연인에게 의존하는 것에 대해...', options: [{ text: '의존하고 싶지만 거절이 두려워요', type: 'ANXIOUS' }, { text: '자연스럽게 의존하고 의지할 수 있어요', type: 'SECURE' }, { text: '최대한 혼자 해결하려고 해요', type: 'AVOIDANT' }] },
      { question: '다툼 후 화해 과정에서...', options: [{ text: '빨리 해결하고 싶어서 먼저 연락해요', type: 'ANXIOUS' }, { text: '서로 감정 정리 후 차분히 대화해요', type: 'SECURE' }, { text: '시간이 지나면 자연스럽게 해결되길 바라요', type: 'AVOIDANT' }] },
    ],
    language: [
      { question: '사랑 받는다고 느낄 때는?', options: [{ text: '"사랑해"를 직접 들을 때', type: 'WORDS' }, { text: '뭔가를 같이 할 때', type: 'TIME' }, { text: '선물을 받을 때', type: 'GIFT' }, { text: '안아줄 때', type: 'TOUCH' }] },
      { question: '파트너에게 가장 바라는 것은?', options: [{ text: '칭찬과 격려의 말', type: 'WORDS' }, { text: '함께하는 시간', type: 'TIME' }, { text: '작은 선물과 이벤트', type: 'GIFT' }, { text: '스킨십과 신체 접촉', type: 'TOUCH' }] },
      { question: '기분이 안 좋을 때 가장 위로가 되는 것은?', options: [{ text: '"힘들겠다"는 공감의 말', type: 'WORDS' }, { text: '곁에 그냥 있어주기', type: 'TIME' }, { text: '좋아하는 것 사다 주기', type: 'GIFT' }, { text: '포옹', type: 'TOUCH' }] },
    ],
    work: [
      { question: '팀 프로젝트에서 나의 역할은?', options: [{ text: '전체 방향을 제시하는 리더', type: 'LEADER' }, { text: '꼼꼼하게 실행하는 실무자', type: 'EXECUTOR' }, { text: '아이디어를 내는 크리에이터', type: 'CREATOR' }, { text: '팀 분위기를 살리는 조율자', type: 'COORDINATOR' }] },
      { question: '일할 때 가장 집중이 잘 되는 환경은?', options: [{ text: '조용하고 혼자인 공간', type: 'INDEPENDENT' }, { text: '활기찬 사무실 분위기', type: 'COLLABORATIVE' }, { text: '카페나 외부 공간', type: 'FLEXIBLE' }] },
      { question: '마감일 전날 나는...', options: [{ text: '이미 완료하고 검토 중이에요', type: 'PLANNER' }, { text: '막판 스퍼트로 최고 퍼포먼스 발휘', type: 'SPRINTER' }] },
      { question: '일에서 가장 중요하게 생각하는 것은?', options: [{ text: '성과와 결과물', type: 'RESULT' }, { text: '과정과 성장', type: 'GROWTH' }, { text: '팀워크와 관계', type: 'TEAM' }] },
    ],
    talent: [
      { question: '어릴 때 가장 잘 했던 것은?', options: [{ text: '그림, 글쓰기 등 창작 활동', type: 'CREATIVE' }, { text: '수학, 과학 등 논리적 사고', type: 'ANALYTICAL' }, { text: '운동, 춤 등 신체 활동', type: 'PHYSICAL' }, { text: '친구들 사이에서 분위기 메이킹', type: 'SOCIAL' }] },
      { question: '시간 가는 줄 모르고 빠져드는 활동은?', options: [{ text: '무언가를 만들거나 표현하는 것', type: 'CREATIVE' }, { text: '복잡한 문제를 파고드는 것', type: 'ANALYTICAL' }, { text: '몸을 움직이는 것', type: 'PHYSICAL' }, { text: '사람들과 대화하는 것', type: 'SOCIAL' }] },
      { question: '칭찬받는 포인트는?', options: [{ text: '아이디어가 독특하다는 것', type: 'CREATIVE' }, { text: '꼼꼼하고 논리적이라는 것', type: 'ANALYTICAL' }, { text: '에너지와 활력이 넘친다는 것', type: 'PHYSICAL' }, { text: '사람들을 잘 이끈다는 것', type: 'SOCIAL' }] },
    ],
    emotion: [
      { question: '슬플 때 나는...', options: [{ text: '혼자 울고 싶어요', type: 'INTROVERT_EMOTION' }, { text: '누군가에게 털어놓고 싶어요', type: 'EXTROVERT_EMOTION' }] },
      { question: '기쁜 일이 생겼을 때...', options: [{ text: '혼자 조용히 음미해요', type: 'INTROVERT_EMOTION' }, { text: '바로 주변에 알리고 싶어요', type: 'EXTROVERT_EMOTION' }] },
      { question: '감정을 표현하는 방식은?', options: [{ text: '글이나 그림 등으로 간접 표현', type: 'INDIRECT' }, { text: '말이나 행동으로 직접 표현', type: 'DIRECT' }] },
    ],
    stress: [
      { question: '스트레스를 받을 때 나는...', options: [{ text: '먹거나 자는 것으로 해소해요', type: 'PHYSICAL' }, { text: '일에 더 몰두해요', type: 'WORKAHOLIC' }, { text: '사람들과 어울리며 풀어요', type: 'SOCIAL_RELIEF' }, { text: '혼자만의 시간을 가져요', type: 'SOLO_RELIEF' }] },
      { question: '스트레스의 주원인은 주로...', options: [{ text: '인간관계 문제', type: 'RELATION_STRESS' }, { text: '업무/성과 압박', type: 'WORK_STRESS' }, { text: '미래에 대한 불안', type: 'FUTURE_STRESS' }] },
    ],
    social: [
      { question: '처음 만나는 사람과 대화할 때...', options: [{ text: '금방 친해지는 편이에요', type: 'OPEN' }, { text: '시간이 걸리지만 깊게 사귀어요', type: 'DEEP' }] },
      { question: '모임에서 나의 역할은?', options: [{ text: '분위기 메이킹 담당', type: 'ENERGIZER' }, { text: '옆에서 들어주는 역할', type: 'LISTENER' }, { text: '중간 조율자 역할', type: 'MEDIATOR' }] },
    ],
    food: [
      { question: '좋아하는 음식 스타일은?', options: [{ text: '맵고 자극적인 음식', type: 'SPICY' }, { text: '달콤하고 디저트류', type: 'SWEET' }, { text: '깔끔하고 건강한 음식', type: 'HEALTHY' }, { text: '든든한 고기류', type: 'MEAT' }] },
      { question: '외식할 때 식당을 고르는 방법은?', options: [{ text: '항상 가던 곳으로', type: 'STABLE' }, { text: '새로운 맛집 탐방', type: 'ADVENTUROUS' }] },
      { question: '음식을 먹을 때...', options: [{ text: '사진 먼저, 그다음 먹어요', type: 'AESTHETIC' }, { text: '일단 먹고 봐요', type: 'PRACTICAL' }] },
    ],
    animal: [
      { question: '나의 생활 패턴은?', options: [{ text: '활동적이고 바쁘게 지내요', type: 'ACTIVE' }, { text: '여유롭게 느린 삶을 즐겨요', type: 'RELAXED' }] },
      { question: '위기 상황에서 나는?', options: [{ text: '재빠르게 대처해요', type: 'QUICK' }, { text: '신중하게 생각하고 행동해요', type: 'CAREFUL' }] },
      { question: '나의 가장 큰 매력은?', options: [{ text: '강렬하고 카리스마 있는 존재감', type: 'POWERFUL' }, { text: '귀엽고 친근한 분위기', type: 'CUTE' }, { text: '자유롭고 독립적인 모습', type: 'FREE' }] },
    ],
  };
  return baseQuestions[type] || baseQuestions['love'];
}

function generateLoveResults() {
  return [
    {
      type: 'ANXIOUS', emoji: '💗',
      title: '열정 몰입형',
      subtitle: '사랑에 전부를 쏟아붓는 불꽃 같은 연애형',
      keywords: ['열정적', '감정적', '헌신적', '의존적', '애정 확인'],
      description: '당신은 연애에 모든 것을 쏟아붓는 열정적인 유형입니다. 상대에 대한 깊은 감정을 느끼고, 사랑받는다는 확신을 원합니다. 가끔 불안함을 느끼기도 하지만, 그만큼 진심으로 사랑하는 유형입니다.',
      traits: [
        { label: '열정도', value: 95 }, { label: '헌신도', value: 90 },
        { label: '감정 표현', value: 88 }, { label: '불안 감수성', value: 82 },
      ],
      strengths: ['뜨거운 열정과 헌신', '감정 표현이 풍부함', '파트너를 위한 희생 정신'],
      growthPoints: ['자기 자신을 먼저 사랑하기', '과도한 확인 줄이기', '파트너와 건강한 거리두기'],
      compatibility: [
        { emoji: '💚', type: '안정 애착형', relation: '최고의 파트너', desc: '안정감을 주는 파트너를 만나면 최고의 사랑을 경험해요' },
      ],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'SECURE', emoji: '💚',
      title: '안정 균형형',
      subtitle: '건강한 경계와 깊은 신뢰로 사랑하는 유형',
      keywords: ['안정적', '신뢰', '균형', '독립적', '성숙함'],
      description: '당신은 연애에서 건강한 균형을 유지하는 안정적인 유형입니다. 상대를 신뢰하면서도 자신의 독립성을 잃지 않고, 갈등을 성숙하게 해결하는 능력이 있습니다.',
      traits: [
        { label: '안정감', value: 92 }, { label: '신뢰도', value: 90 },
        { label: '균형감', value: 88 }, { label: '의사소통', value: 94 },
      ],
      strengths: ['건강한 자존감', '갈등 해결 능력', '신뢰 기반 관계 형성'],
      growthPoints: ['감정 표현 더 적극적으로 하기', '파트너의 불안에 공감하기'],
      compatibility: [
        { emoji: '💚', type: '모든 유형', relation: '잘 맞는 파트너', desc: '안정적인 당신은 어떤 유형과도 건강한 관계를 만들 수 있어요' },
      ],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'AVOIDANT', emoji: '🌿',
      title: '자유 독립형',
      subtitle: '나를 잃지 않으면서 사랑하는 방법을 찾는 유형',
      keywords: ['독립적', '자유', '거리두기', '신중함', '자기 보호'],
      description: '당신은 연애에서 자신만의 공간과 자유를 중요시하는 유형입니다. 깊은 감정을 느끼지만 표현하는 데 조심스럽고, 상처받지 않기 위해 때로는 거리를 두기도 합니다.',
      traits: [
        { label: '독립성', value: 94 }, { label: '자기 보호', value: 88 },
        { label: '신중함', value: 86 }, { label: '자유 추구', value: 92 },
      ],
      strengths: ['강한 독립심', '자기 자신에 대한 이해', '신중한 관계 선택'],
      growthPoints: ['감정 열기 연습하기', '파트너에게 의지하는 것 연습하기', '취약함 보여주기'],
      compatibility: [
        { emoji: '💙', type: '안정 균형형', relation: '좋은 파트너', desc: '안정적인 파트너가 당신의 마음을 서서히 열어줄 수 있어요' },
      ],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateAttachmentResults() {
  return generateLoveResults();
}

function generateLoveLanguageResults() {
  return [
    {
      type: 'WORDS', emoji: '💬',
      title: '인정의 말 유형',
      subtitle: '"사랑해"라는 한마디가 세상을 바꾸는 유형',
      keywords: ['언어적 표현', '칭찬', '인정', '격려', '감사'],
      description: '당신은 언어적 표현으로 사랑을 느끼는 유형입니다. 파트너의 따뜻한 말 한마디가 하루를 행복하게 만들어주고, 반대로 비판적인 말은 깊은 상처를 남깁니다.',
      traits: [{ label: '언어 민감도', value: 94 }, { label: '표현 욕구', value: 88 }],
      strengths: ['언어로 사랑을 잘 표현함', '칭찬과 격려에 민감하게 반응'],
      growthPoints: ['말 외의 사랑 표현도 인식하기', '침묵도 사랑임을 받아들이기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'TIME', emoji: '⏰',
      title: '함께하는 시간 유형',
      subtitle: '같은 공간에 있는 것만으로도 충분한 유형',
      keywords: ['함께', '현재', '집중', '관심', '동행'],
      description: '당신은 파트너와 함께하는 시간 자체에서 사랑을 느끼는 유형입니다. 화려한 선물보다 단 한 시간의 진심 어린 함께함이 더 소중합니다.',
      traits: [{ label: '동행 욕구', value: 92 }, { label: '현재 집중', value: 90 }],
      strengths: ['함께하는 순간을 소중히 여김', '파트너에게 온전히 집중'],
      growthPoints: ['혼자만의 시간도 건강하게 즐기기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateWorkResults() {
  return [
    {
      type: 'LEADER', emoji: '👑',
      title: '비전 제시형 리더',
      subtitle: '팀의 방향을 제시하고 사람들을 이끄는 유형',
      keywords: ['리더십', '결단력', '비전', '카리스마', '목표 지향'],
      description: '당신은 자연스럽게 팀의 방향을 제시하고 사람들에게 동기를 부여하는 리더형입니다. 큰 그림을 보는 능력이 탁월하고 목표를 향해 팀을 이끄는 것이 강점입니다.',
      traits: [{ label: '리더십', value: 92 }, { label: '결단력', value: 88 }, { label: '비전', value: 90 }],
      strengths: ['강한 리더십', '명확한 방향 제시', '팀 동기 부여'],
      growthPoints: ['세부 사항도 챙기기', '팀원 의견 더 경청하기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'CREATOR', emoji: '🎨',
      title: '창의 아이디어형',
      subtitle: '남들이 생각 못한 것을 만들어내는 창의적 유형',
      keywords: ['창의성', '혁신', '아이디어', '자유로움', '독창적'],
      description: '당신은 독창적인 아이디어와 창의적 사고로 조직에 새로운 바람을 불어넣는 유형입니다.',
      traits: [{ label: '창의력', value: 96 }, { label: '혁신 성향', value: 90 }],
      strengths: ['독창적 아이디어 생성', '새로운 관점 제시', '문제 해결 창의성'],
      growthPoints: ['아이디어를 실행으로 연결하기', '현실적 제약 고려하기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateTalentResults() {
  return [
    {
      type: 'CREATIVE', emoji: '🎭',
      title: '예술·표현 재능형',
      subtitle: '세상에 없던 것을 창조하는 타고난 아티스트',
      keywords: ['창의성', '예술성', '표현', '감수성', '독창성'],
      description: '당신의 숨겨진 재능은 창의적 표현에 있습니다. 글쓰기, 디자인, 음악, 영상 등 다양한 창작 분야에서 남다른 능력을 발휘할 수 있습니다.',
      traits: [{ label: '창의력', value: 94 }, { label: '감수성', value: 90 }, { label: '표현력', value: 88 }],
      strengths: ['독창적 사고', '감수성 풍부', '새로운 것 창조'],
      growthPoints: ['꾸준한 연습과 기술 습득', '비판에 단단해지기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'ANALYTICAL', emoji: '🔬',
      title: '분석·논리 재능형',
      subtitle: '복잡한 문제를 단숨에 꿰뚫는 타고난 분석가',
      keywords: ['논리', '분석', '체계', '정밀', '문제해결'],
      description: '당신의 재능은 복잡한 것을 단순하게 만드는 분석 능력입니다. IT, 금융, 연구, 컨설팅 등 논리적 사고가 필요한 분야에서 빛을 발합니다.',
      traits: [{ label: '분석력', value: 95 }, { label: '논리성', value: 92 }, { label: '체계성', value: 88 }],
      strengths: ['복잡한 문제 해결', '데이터 기반 사고', '정밀한 판단'],
      growthPoints: ['감성적 소통 능력 키우기', '직관도 믿어보기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'SOCIAL', emoji: '🌟',
      title: '소통·리더십 재능형',
      subtitle: '사람들을 연결하고 움직이는 타고난 소통가',
      keywords: ['소통', '영향력', '공감', '네트워크', '설득'],
      description: '당신의 재능은 사람들과 연결하고 영향력을 발휘하는 것입니다. 영업, 마케팅, 교육, 코칭 등 사람을 대하는 분야에서 탁월한 성과를 냅니다.',
      traits: [{ label: '소통 능력', value: 94 }, { label: '공감력', value: 91 }, { label: '설득력', value: 89 }],
      strengths: ['강한 영향력', '넓은 인맥', '자연스러운 리더십'],
      growthPoints: ['혼자 집중하는 시간도 가지기', '깊이 있는 전문성 쌓기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateEmotionResults() {
  return [
    {
      type: 'INTROVERT_EMOTION', emoji: '🌙',
      title: '내면 성숙형',
      subtitle: '고요한 내면 속에서 깊이 성장하는 유형',
      keywords: ['내성적', '성찰', '깊음', '차분함', '성숙함'],
      description: '당신의 정서 나이는 실제 나이보다 성숙합니다. 혼자만의 시간을 통해 감정을 소화하고, 깊이 생각하는 습관이 있습니다.',
      traits: [{ label: '감정 성숙도', value: 90 }, { label: '자기 인식', value: 88 }],
      strengths: ['깊은 자기 이해', '감정 조절 능력', '성숙한 판단력'],
      growthPoints: ['감정 표현 연습하기', '타인과 감정 나누기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'EXTROVERT_EMOTION', emoji: '☀️',
      title: '감정 표현형',
      subtitle: '풍부한 감정을 솔직하게 표현하는 활기찬 유형',
      keywords: ['표현적', '활기차다', '솔직함', '감정 풍부', '공유'],
      description: '당신은 감정을 솔직하게 표현하고 다른 사람들과 감정을 나누는 것을 좋아합니다. 감정이 풍부하고 표현적인 것이 큰 강점입니다.',
      traits: [{ label: '감정 표현', value: 92 }, { label: '공감 표현', value: 88 }],
      strengths: ['감정 표현 능력', '솔직함', '활기찬 에너지'],
      growthPoints: ['감정 조절 능력 키우기', '내면 성찰 시간 갖기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateStressResults() {
  return [
    {
      type: 'PHYSICAL', emoji: '🍔',
      title: '신체 해소형',
      subtitle: '몸으로 스트레스를 푸는 본능적 대처형',
      keywords: ['식욕', '수면', '신체적', '본능적', '즉각 해소'],
      description: '스트레스를 받으면 식욕이나 수면으로 해소하는 유형입니다. 몸이 먼저 반응하는 편이에요.',
      traits: [{ label: '신체 반응', value: 88 }, { label: '즉각 해소', value: 85 }],
      strengths: ['빠른 스트레스 해소', '몸의 신호를 잘 인식'],
      growthPoints: ['건강한 신체 해소법 찾기', '과식/과수면 조절하기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'SOLO_RELIEF', emoji: '🏠',
      title: '혼자 충전형',
      subtitle: '혼자만의 시간으로 에너지를 회복하는 유형',
      keywords: ['독립적', '내향적', '자기 회복', '조용한 시간', '충전'],
      description: '혼자만의 공간과 시간으로 스트레스를 해소하는 유형입니다. 조용한 환경에서 재충전이 잘 됩니다.',
      traits: [{ label: '자기 충전력', value: 92 }, { label: '독립성', value: 90 }],
      strengths: ['자기 회복 능력', '독립적 문제 해결'],
      growthPoints: ['도움 요청하기 연습', '사회적 지지망 만들기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateSocialResults() {
  return [
    {
      type: 'OPEN', emoji: '🦋',
      title: '사교형 연결자',
      subtitle: '어디서든 친구를 만드는 타고난 소셜 매력러',
      keywords: ['사교적', '외향적', '친화력', '활발함', '네트워크'],
      description: '당신은 어디서나 금방 친해지는 타고난 소셜 매력을 가진 유형입니다. 넓은 인간관계 네트워크가 당신의 큰 자산입니다.',
      traits: [{ label: '친화력', value: 94 }, { label: '사교성', value: 92 }],
      strengths: ['넓은 인맥', '자연스러운 소통', '분위기 메이킹'],
      growthPoints: ['관계의 깊이 더 추구하기', '경청 능력 키우기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'DEEP', emoji: '🌊',
      title: '깊이 연결형',
      subtitle: '적지만 의미 있는 관계를 소중히 하는 유형',
      keywords: ['깊이', '진정성', '소수의 친구', '신뢰', '내향적'],
      description: '당신은 많은 사람보다 몇 명의 진심 어린 관계를 선호하는 유형입니다. 한번 인연을 맺으면 오래가는 깊은 우정을 만들어갑니다.',
      traits: [{ label: '관계 깊이', value: 94 }, { label: '신뢰도', value: 92 }],
      strengths: ['깊고 진실한 관계', '높은 신뢰도', '신중한 관계 선택'],
      growthPoints: ['새로운 사람에게 먼저 다가가기', '표현 더 적극적으로 하기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateFunResults(type) {
  if (type === 'animal') {
    return [
      {
        type: 'POWERFUL', emoji: '🦁',
        title: '사자형',
        subtitle: '카리스마 넘치는 무리의 리더',
        keywords: ['카리스마', '리더십', '당당함', '자신감', '보호'],
        description: '당신은 사자처럼 강렬한 존재감과 카리스마를 가진 유형입니다. 자연스럽게 무리의 리더가 되고 주변을 보호하는 강한 성격을 가지고 있어요.',
        traits: [{ label: '카리스마', value: 95 }, { label: '리더십', value: 90 }],
        strengths: ['강한 존재감', '자연스러운 리더십', '결단력'],
        growthPoints: ['유연성 키우기', '타인 의견 경청하기'],
        compatibility: [],
        affiliates: DEFAULT_AFFILIATES,
      },
      {
        type: 'CUTE', emoji: '🐶',
        title: '강아지형',
        subtitle: '모두에게 사랑받는 따뜻한 에너지 메이커',
        keywords: ['친근함', '애교', '사랑스러움', '에너지', '충성'],
        description: '당신은 강아지처럼 밝고 에너지 넘치는 유형입니다. 주변 사람들에게 긍정적인 에너지를 전달하고 누구에게나 친근하게 다가갑니다.',
        traits: [{ label: '친화력', value: 94 }, { label: '에너지', value: 92 }],
        strengths: ['모두에게 친근함', '밝고 긍정적인 에너지', '충성스러운 관계'],
        growthPoints: ['혼자만의 시간도 즐기기', '경계선 설정하기'],
        compatibility: [],
        affiliates: DEFAULT_AFFILIATES,
      },
      {
        type: 'FREE', emoji: '🦅',
        title: '독수리형',
        subtitle: '누구에게도 얽매이지 않는 자유로운 영혼',
        keywords: ['자유', '독립', '비전', '높은 시야', '자존감'],
        description: '당신은 독수리처럼 높은 곳에서 세상을 바라보는 자유롭고 독립적인 유형입니다. 넓은 시야와 높은 목표를 향해 나아갑니다.',
        traits: [{ label: '독립성', value: 95 }, { label: '자유 추구', value: 93 }],
        strengths: ['높은 독립심', '넓은 시야', '강한 자존감'],
        growthPoints: ['연결과 협력 경험하기', '현재에 집중하기'],
        compatibility: [],
        affiliates: DEFAULT_AFFILIATES,
      },
    ];
  }
  // food type
  return [
    {
      type: 'SPICY', emoji: '🌶️',
      title: '불닭 소울형',
      subtitle: '자극적이고 열정적인 삶을 즐기는 유형',
      keywords: ['열정', '자극', '직설적', '에너지', '도전'],
      description: '맵고 자극적인 것을 좋아하는 당신은 인생도 뜨겁고 열정적으로 살아갑니다. 직설적이고 솔직하며, 새로운 도전을 두려워하지 않아요.',
      traits: [{ label: '열정도', value: 92 }, { label: '모험심', value: 88 }],
      strengths: ['열정적인 에너지', '솔직한 성격', '도전 정신'],
      growthPoints: ['여유와 느림 즐기기', '타인 속도 맞춰주기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'SWEET', emoji: '🍰',
      title: '달달 힐링형',
      subtitle: '달콤한 것에서 삶의 행복을 찾는 유형',
      keywords: ['감성', '낭만', '따뜻함', '힐링', '세심함'],
      description: '달콤한 것을 좋아하는 당신은 감성적이고 낭만적인 성향을 가지고 있습니다. 작은 것에서 행복을 찾고 주변을 따뜻하게 만드는 능력이 있어요.',
      traits: [{ label: '감수성', value: 90 }, { label: '낭만성', value: 92 }],
      strengths: ['세심한 배려', '감성적 소통', '힐링 에너지'],
      growthPoints: ['현실적인 면도 균형 있게', '자신을 위해 쓴소리 듣기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateShadowResults() {
  return [
    {
      type: 'SHADOW_I', emoji: '🌑',
      title: '어둠 속의 은둔자',
      subtitle: '표면과 달리 내면은 고요함을 갈망하는 유형',
      keywords: ['숨겨진 내향성', '고독', '내면 세계', '그림자', '성찰'],
      description: '평소에는 활발해 보이지만, 깊은 내면에는 혼자이고 싶고 조용히 생각에 잠기고 싶은 자아가 숨어 있습니다.',
      traits: [{ label: '숨겨진 내향성', value: 88 }, { label: '깊은 성찰', value: 92 }],
      strengths: ['깊은 내면 세계', '혼자서도 충만함', '통찰력'],
      growthPoints: ['그림자 자아를 인정하고 통합하기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'SHADOW_E', emoji: '🌓',
      title: '내면의 표현 욕구형',
      subtitle: '조용한 겉모습 뒤에 폭발적인 표현 욕구를 가진 유형',
      keywords: ['억압된 표현', '잠재된 외향성', '표현 욕구', '해방'],
      description: '평소엔 조용하고 내성적이지만, 깊은 내면에는 자신을 표현하고 싶고 주목받고 싶은 욕구가 잠들어 있습니다.',
      traits: [{ label: '잠재된 외향성', value: 84 }, { label: '표현 욕구', value: 88 }],
      strengths: ['내면의 풍부한 에너지', '관계에 대한 진심'],
      growthPoints: ['억압된 표현 욕구 건강하게 해소하기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

// =====================================================
// 점성술 · 별자리 퀴즈 & 결과
// =====================================================

function generateAstroQuiz() {
  return [
    { question: '나는 새로운 환경에서...', options: [{ text: '금방 적응하고 주도적으로 나서요', type: 'FIRE' }, { text: '차분히 관찰하다가 천천히 녹아들어요', type: 'EARTH' }, { text: '여러 사람과 대화하며 빠르게 연결돼요', type: 'AIR' }, { text: '감정적으로 받아들이며 분위기를 느껴요', type: 'WATER' }] },
    { question: '결정을 내릴 때 나는...', options: [{ text: '직관적으로 바로 결정해요', type: 'FIRE' }, { text: '충분히 검토하고 안전한 선택을 해요', type: 'EARTH' }, { text: '다양한 정보를 수집해 논리적으로 판단해요', type: 'AIR' }, { text: '감정과 분위기를 중요하게 생각해요', type: 'WATER' }] },
    { question: '스트레스를 받을 때...', options: [{ text: '운동이나 활동적인 것으로 풀어요', type: 'FIRE' }, { text: '루틴을 지키며 안정을 찾아요', type: 'EARTH' }, { text: '친구와 대화하거나 책·유튜브를 봐요', type: 'AIR' }, { text: '혼자 감정을 정리하는 시간을 가져요', type: 'WATER' }] },
    { question: '나의 가장 큰 강점은?', options: [{ text: '리더십과 추진력', type: 'FIRE' }, { text: '꼼꼼함과 실행력', type: 'EARTH' }, { text: '소통 능력과 아이디어', type: 'AIR' }, { text: '공감 능력과 감수성', type: 'WATER' }] },
    { question: '연애에서 나는...', options: [{ text: '열정적이고 먼저 표현하는 편', type: 'FIRE' }, { text: '안정적이고 신뢰를 쌓아가는 편', type: 'EARTH' }, { text: '대화와 지적 교류를 중시하는 편', type: 'AIR' }, { text: '감성적이고 깊은 유대를 원하는 편', type: 'WATER' }] },
    { question: '내가 끌리는 여행지는?', options: [{ text: '액티비티가 가득한 모험 여행', type: 'FIRE' }, { text: '자연 속 힐링·캠핑 여행', type: 'EARTH' }, { text: '도시 탐방·박물관·카페 투어', type: 'AIR' }, { text: '바다·온천·조용한 리조트', type: 'WATER' }] },
  ];
}

function generateZodiacResults() {
  return [
    {
      type: 'FIRE', emoji: '🔥',
      title: '불의 별자리형',
      subtitle: '양자리 · 사자자리 · 사수자리의 에너지',
      keywords: ['열정', '리더십', '추진력', '카리스마', '독립'],
      description: '당신은 불의 원소를 가진 별자리 에너지를 품고 있습니다. 타고난 리더십과 열정으로 주변을 이끌며, 새로운 도전을 두려워하지 않습니다. 목표를 향한 강한 추진력이 최대 강점입니다.',
      traits: [{ label: '열정도', value: 96 }, { label: '리더십', value: 91 }, { label: '추진력', value: 93 }, { label: '독립성', value: 88 }],
      strengths: ['강렬한 카리스마와 존재감', '타고난 리더십', '두려움 없는 도전 정신', '주변에 에너지를 전달하는 능력'],
      growthPoints: ['충동적인 결정 줄이기', '타인의 속도 맞춰주기', '인내심 키우기'],
      compatibility: [
        { emoji: '💚', type: '바람의 별자리형', relation: '잘 맞는 조합', desc: '불에 산소를 공급하듯 서로를 살려주는 관계' },
        { emoji: '❤️', type: '같은 불의 별자리형', relation: '뜨거운 관계', desc: '함께라면 무엇이든 해낼 수 있는 폭발적 조합' },
      ],
      affiliates: [{ emoji: '🌟', title: '서양 점성술 완전 정복', desc: '나의 별자리 완벽 분석 가이드', url: '#affiliate-astro-1' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'EARTH', emoji: '🌍',
      title: '흙의 별자리형',
      subtitle: '황소자리 · 처녀자리 · 염소자리의 에너지',
      keywords: ['안정', '실용', '끈기', '신뢰', '현실감각'],
      description: '당신은 흙의 원소를 가진 안정적이고 신뢰할 수 있는 사람입니다. 꾸준한 노력과 실용적인 사고방식으로 목표를 착실하게 이루어냅니다. 함께하면 든든한 존재입니다.',
      traits: [{ label: '안정감', value: 94 }, { label: '실행력', value: 90 }, { label: '신뢰도', value: 92 }, { label: '꼼꼼함', value: 88 }],
      strengths: ['강한 책임감과 신뢰성', '현실적인 문제 해결 능력', '꾸준한 노력과 인내심', '물질적·재정적 안정 추구'],
      growthPoints: ['변화에 유연해지기', '즉흥성 즐기기', '감정 표현 더 하기'],
      compatibility: [
        { emoji: '💚', type: '물의 별자리형', relation: '이상적인 조합', desc: '흙이 물을 머금듯 서로를 깊이 이해하는 관계' },
      ],
      affiliates: [{ emoji: '💰', title: '별자리별 재물운 완전 분석', desc: '나의 금전운을 알아보세요', url: '#affiliate-astro-2' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'AIR', emoji: '🌬️',
      title: '바람의 별자리형',
      subtitle: '쌍둥이자리 · 천칭자리 · 물병자리의 에너지',
      keywords: ['지성', '소통', '자유', '창의', '호기심'],
      description: '당신은 바람의 원소를 가진 지적이고 자유로운 영혼입니다. 뛰어난 소통 능력과 다양한 관심사를 가지고 있으며, 새로운 아이디어를 끊임없이 탐구합니다.',
      traits: [{ label: '지성', value: 93 }, { label: '소통 능력', value: 91 }, { label: '창의력', value: 89 }, { label: '자유 추구', value: 94 }],
      strengths: ['탁월한 언어 능력과 소통 스킬', '폭넓은 지식과 호기심', '자유롭고 개방적인 사고', '다양한 관계 네트워크'],
      growthPoints: ['깊이 있는 집중력 키우기', '감정에 더 귀 기울이기', '결정을 더 빠르게 내리기'],
      compatibility: [
        { emoji: '💚', type: '불의 별자리형', relation: '완벽한 시너지', desc: '바람이 불꽃을 키우듯 서로를 빛나게 하는 조합' },
      ],
      affiliates: [{ emoji: '📡', title: '별자리 심리 완전 분석', desc: '나의 내면 세계를 별자리로 탐구', url: '#affiliate-astro-3' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'WATER', emoji: '🌊',
      title: '물의 별자리형',
      subtitle: '게자리 · 전갈자리 · 물고기자리의 에너지',
      keywords: ['감수성', '직관', '공감', '신비', '깊이'],
      description: '당신은 물의 원소를 가진 깊은 감수성과 직관력의 소유자입니다. 타인의 감정을 누구보다 예리하게 읽으며, 보이지 않는 것들을 감지하는 신비로운 능력이 있습니다.',
      traits: [{ label: '감수성', value: 95 }, { label: '직관력', value: 92 }, { label: '공감 능력', value: 94 }, { label: '신비로움', value: 88 }],
      strengths: ['탁월한 공감 능력', '깊은 감수성과 예술성', '강한 직관력', '진심 어린 유대 관계'],
      growthPoints: ['감정에 덜 매몰되기', '현실적인 경계선 설정하기', '자기 보호 능력 키우기'],
      compatibility: [
        { emoji: '💚', type: '흙의 별자리형', relation: '이상적인 조합', desc: '흙이 물을 담아주듯 안정감을 주는 관계' },
      ],
      affiliates: [{ emoji: '🔮', title: '직관력 키우기 명상 가이드', desc: '나의 내면 감각을 깨우는 법', url: '#affiliate-astro-4' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
  ];
}

function generateAstroLoveQuiz() {
  return [
    { question: '연인에게 가장 원하는 것은?', options: [{ text: '열정과 설렘', type: 'FIRE_LOVE' }, { text: '안정과 신뢰', type: 'EARTH_LOVE' }, { text: '지적 대화와 자유', type: 'AIR_LOVE' }, { text: '감성적 교감과 깊은 유대', type: 'WATER_LOVE' }] },
    { question: '연인과 다툴 때 나는?', options: [{ text: '직접적으로 바로 해결하려 해요', type: 'FIRE_LOVE' }, { text: '시간을 두고 차분히 이야기해요', type: 'EARTH_LOVE' }, { text: '논리적으로 설명하고 합의를 찾아요', type: 'AIR_LOVE' }, { text: '감정이 너무 앞서서 힘들어요', type: 'WATER_LOVE' }] },
    { question: '이상적인 데이트는?', options: [{ text: '스포츠·액티비티·모험', type: 'FIRE_LOVE' }, { text: '맛집·드라이브·집에서 요리', type: 'EARTH_LOVE' }, { text: '전시·영화·카페 대화', type: 'AIR_LOVE' }, { text: '바닷가·감성 카페·조용한 여행', type: 'WATER_LOVE' }] },
    { question: '연애에서 가장 힘든 것은?', options: [{ text: '통제받는 느낌', type: 'FIRE_LOVE' }, { text: '불안정하고 예측 불가한 상황', type: 'EARTH_LOVE' }, { text: '지나친 집착과 의존', type: 'AIR_LOVE' }, { text: '감정을 이해받지 못하는 것', type: 'WATER_LOVE' }] },
  ];
}

function generateZodiacLoveResults() {
  return [
    {
      type: 'FIRE_LOVE', emoji: '🔥',
      title: '열정 폭발형 연애',
      subtitle: '뜨겁고 강렬하게 사랑하는 불꽃 연애 스타일',
      keywords: ['열정', '설렘', '직진', '솔직함', '강렬함'],
      description: '당신의 연애 스타일은 불꽃처럼 뜨겁고 강렬합니다. 좋아하면 바로 표현하고, 연애에서도 주도적으로 이끌어 나갑니다. 설레는 순간들을 사랑하며, 식어가는 관계에는 쉽게 흥미를 잃기도 합니다.',
      traits: [{ label: '열정도', value: 97 }, { label: '주도성', value: 92 }, { label: '표현력', value: 90 }],
      strengths: ['강렬한 첫인상과 설렘 제공', '주도적인 연애 리드', '솔직한 감정 표현'],
      growthPoints: ['상대의 속도 맞춰주기', '식어도 지속하는 연습', '감정 조절 능력 키우기'],
      compatibility: [{ emoji: '💚', type: '바람형 연애 스타일', relation: '최고의 궁합', desc: '자유로운 바람이 불꽃을 더 크게 키워줘요' }],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'EARTH_LOVE', emoji: '🌿',
      title: '신뢰 안정형 연애',
      subtitle: '천천히 깊어지는 뿌리 깊은 사랑 스타일',
      keywords: ['안정', '신뢰', '헌신', '현실적', '든든함'],
      description: '당신의 연애는 천천히 뿌리를 내리는 나무처럼 깊어집니다. 화려하진 않지만 믿을 수 있고, 오랜 시간이 지나도 변하지 않는 사랑을 추구합니다.',
      traits: [{ label: '안정감', value: 95 }, { label: '신뢰도', value: 93 }, { label: '헌신도', value: 90 }],
      strengths: ['믿을 수 있는 파트너', '장기적인 관계 유지', '현실적 지지와 도움'],
      growthPoints: ['설렘과 낭만 표현 더 하기', '변화와 즉흥성 즐기기'],
      compatibility: [{ emoji: '💚', type: '물형 연애 스타일', relation: '완벽한 궁합', desc: '흙이 물을 품듯 서로를 이해하는 깊은 관계' }],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'AIR_LOVE', emoji: '🌬️',
      title: '지적 자유형 연애',
      subtitle: '대화와 자유로 연결되는 스마트한 사랑 스타일',
      keywords: ['대화', '자유', '지성', '독립', '유머'],
      description: '당신은 대화가 잘 통하는 파트너에게 끌립니다. 지적인 교류와 함께하는 자유로움을 중시하며, 서로의 독립성을 존중하는 관계를 원합니다.',
      traits: [{ label: '지적 교류', value: 93 }, { label: '자유 추구', value: 91 }, { label: '유머', value: 88 }],
      strengths: ['깊은 대화 능력', '서로의 독립 존중', '유머와 재치'],
      growthPoints: ['감정적 깊이 더 보여주기', '지나친 거리 좁히기'],
      compatibility: [{ emoji: '💚', type: '불형 연애 스타일', relation: '역동적인 궁합', desc: '자유로운 바람이 불꽃을 더욱 강하게 만들어요' }],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'WATER_LOVE', emoji: '🌊',
      title: '감성 깊이형 연애',
      subtitle: '영혼이 연결되는 깊고 신비로운 사랑 스타일',
      keywords: ['감성', '깊이', '교감', '직관', '헌신'],
      description: '당신의 사랑은 깊은 바다처럼 깊고 신비롭습니다. 표면적인 관계보다 영혼 깊이 연결되는 진짜 사랑을 원하며, 파트너의 감정을 누구보다 섬세하게 느낍니다.',
      traits: [{ label: '감수성', value: 96 }, { label: '교감 능력', value: 94 }, { label: '헌신도', value: 91 }],
      strengths: ['깊은 감정적 교감', '섬세한 배려', '진심 어린 헌신'],
      growthPoints: ['감정 과몰입 줄이기', '건강한 경계 설정하기'],
      compatibility: [{ emoji: '💚', type: '흙형 연애 스타일', relation: '이상적인 궁합', desc: '흙이 물을 담아 안정을 주듯 완벽한 보완 관계' }],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

function generateMbtiAstroQuiz() {
  return generateAstroQuiz().concat(generateMbtiQuiz().slice(0, 4));
}

function generateMbtiAstroResults() {
  return generateZodiacResults();
}

function generateTarotQuiz() {
  return [
    { question: '지금 이 순간 가장 강하게 느끼는 감정은?', options: [{ text: '설레임과 기대', type: 'STAR' }, { text: '불안과 걱정', type: 'MOON' }, { text: '열정과 에너지', type: 'SUN' }, { text: '고요함과 성찰', type: 'HERMIT' }] },
    { question: '요즘 내 상황을 색으로 표현하면?', options: [{ text: '황금빛 (기회와 성공)', type: 'SUN' }, { text: '파란빛 (평화와 탐색)', type: 'STAR' }, { text: '보라빛 (신비와 변화)', type: 'MOON' }, { text: '하얀빛 (정화와 시작)', type: 'FOOL' }] },
    { question: '지금 가장 필요한 것은?', options: [{ text: '새로운 시작과 용기', type: 'FOOL' }, { text: '내면의 답을 찾는 시간', type: 'HERMIT' }, { text: '희망과 빛', type: 'STAR' }, { text: '강한 에너지와 확신', type: 'SUN' }] },
    { question: '나에게 지금 다가오는 변화는?', options: [{ text: '예상치 못한 새로운 기회', type: 'WHEEL' }, { text: '감정적인 혼란과 불확실성', type: 'MOON' }, { text: '강렬한 변화와 리셋', type: 'TOWER' }, { text: '성장을 위한 내면의 울림', type: 'JUDGMENT' }] },
  ];
}

function generateTarotResults() {
  return [
    {
      type: 'SUN', emoji: '☀️',
      title: '태양 카드',
      subtitle: '빛나는 성공과 기쁨의 에너지가 찾아오고 있어요',
      keywords: ['성공', '기쁨', '활력', '자신감', '긍정'],
      description: '태양 카드는 최고의 긍정적인 에너지를 상징합니다. 지금 당신에게는 밝은 에너지가 가득 차 있으며, 자신감을 가지고 나아갈 때입니다. 당신이 원하는 것을 향해 당당히 전진하세요.',
      traits: [{ label: '긍정 에너지', value: 96 }, { label: '자신감', value: 92 }, { label: '성공 운', value: 90 }],
      strengths: ['강한 긍정 에너지', '자신감 넘치는 표현', '주변에 빛을 전달'],
      growthPoints: ['자만하지 않도록 주의', '주변을 살펴보는 여유'],
      compatibility: [],
      affiliates: [{ emoji: '☀️', title: '타로 완전 정복 가이드', desc: '22장 메이저 아르카나 완벽 해설', url: '#affiliate-tarot-1' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'MOON', emoji: '🌙',
      title: '달 카드',
      subtitle: '내면의 혼란을 직면하고 진실을 찾을 시간이에요',
      keywords: ['직관', '불확실', '내면', '변화', '신비'],
      description: '달 카드는 불확실성과 내면의 탐험을 상징합니다. 지금 혼란스럽게 느껴지더라도 두려워하지 마세요. 이 시기는 직관을 키우고 자신의 진짜 욕구를 발견하는 중요한 시간입니다.',
      traits: [{ label: '직관력', value: 94 }, { label: '내면 탐구', value: 91 }, { label: '변화 수용', value: 85 }],
      strengths: ['예리한 직관력', '깊은 내면 세계', '숨겨진 것을 감지하는 능력'],
      growthPoints: ['불안에 매몰되지 않기', '명확한 현실 인식하기'],
      compatibility: [],
      affiliates: [{ emoji: '🌙', title: '달의 에너지 활용법', desc: '월별 타로 운세 완전 가이드', url: '#affiliate-tarot-2' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'STAR', emoji: '⭐',
      title: '별 카드',
      subtitle: '희망의 빛이 당신을 향해 쏟아지고 있어요',
      keywords: ['희망', '치유', '영감', '믿음', '안식'],
      description: '별 카드는 희망과 치유의 에너지를 상징합니다. 힘든 시간이 지나고 이제 새로운 희망이 찾아오고 있어요. 자신을 믿고, 우주가 당신을 안내하고 있다는 것을 신뢰하세요.',
      traits: [{ label: '희망 에너지', value: 93 }, { label: '치유력', value: 90 }, { label: '영감', value: 88 }],
      strengths: ['강한 희망과 낙관성', '치유와 회복 능력', '영적 연결감'],
      growthPoints: ['현실적인 행동도 함께하기', '막연한 기대보다 구체적 목표'],
      compatibility: [],
      affiliates: [{ emoji: '✨', title: '별자리·타로 통합 운세', desc: '나만의 우주적 가이드', url: '#affiliate-tarot-3' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'HERMIT', emoji: '🕯️',
      title: '은둔자 카드',
      subtitle: '내면의 지혜를 찾아 혼자만의 시간이 필요해요',
      keywords: ['성찰', '지혜', '내향', '탐구', '고독'],
      description: '은둔자 카드는 내면의 지혜와 성찰의 시간을 상징합니다. 지금은 혼자만의 시간을 통해 자신을 깊이 들여다봐야 할 때입니다. 외부의 소음을 줄이고 내면의 목소리에 귀를 기울이세요.',
      traits: [{ label: '내면 성찰', value: 95 }, { label: '지혜', value: 91 }, { label: '독립성', value: 89 }],
      strengths: ['깊은 내면의 지혜', '자기 자신을 아는 능력', '고독을 즐기는 성숙함'],
      growthPoints: ['완전한 고립은 피하기', '배운 지혜를 나누기'],
      compatibility: [],
      affiliates: [{ emoji: '🕯️', title: '명상과 내면 탐구 가이드', desc: '타로로 시작하는 자기 성찰', url: '#affiliate-tarot-4' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'FOOL', emoji: '🌈',
      title: '바보 카드',
      subtitle: '새로운 시작과 신나는 모험이 기다리고 있어요',
      keywords: ['시작', '자유', '모험', '순수함', '용기'],
      description: '바보 카드는 새로운 시작과 무한한 가능성을 상징합니다. 두려움 없이 새로운 여정을 시작할 준비가 된 당신! 지금이 바로 새로운 도전을 시작할 최고의 타이밍입니다.',
      traits: [{ label: '모험심', value: 94 }, { label: '자유로움', value: 92 }, { label: '순수한 열정', value: 90 }],
      strengths: ['두려움 없는 새로운 시작', '자유롭고 창의적인 사고', '순수한 열정과 에너지'],
      growthPoints: ['무모함과 용기 구분하기', '기본 준비는 갖추기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

// =====================================================
// 사주 · 운세 퀴즈 & 결과
// =====================================================

function generateSajuQuiz() {
  return [
    { question: '나는 어떤 계절에 태어났나요?', options: [{ text: '봄 (3~5월)', type: 'WOOD' }, { text: '여름 (6~8월)', type: 'FIRE' }, { text: '가을 (9~11월)', type: 'METAL' }, { text: '겨울 (12~2월)', type: 'WATER' }] },
    { question: '나의 성격을 가장 잘 나타내는 것은?', options: [{ text: '새로운 것을 시작하는 것을 좋아해요', type: 'WOOD' }, { text: '열정적이고 활기차요', type: 'FIRE' }, { text: '원칙과 질서를 중요하게 생각해요', type: 'METAL' }, { text: '깊이 생각하고 신중해요', type: 'WATER' }, { text: '중재자 역할을 잘 해요', type: 'EARTH' }] },
    { question: '내가 가장 잘하는 것은?', options: [{ text: '새로운 프로젝트 시작하기', type: 'WOOD' }, { text: '사람들에게 동기 부여하기', type: 'FIRE' }, { text: '계획하고 체계적으로 실행하기', type: 'METAL' }, { text: '깊이 분석하고 전략 짜기', type: 'WATER' }, { text: '갈등 조율하고 화합 만들기', type: 'EARTH' }] },
    { question: '스트레스를 받을 때 나는?', options: [{ text: '새로운 것에 도전해요', type: 'WOOD' }, { text: '운동이나 활동으로 발산해요', type: 'FIRE' }, { text: '혼자 정리 정돈을 해요', type: 'METAL' }, { text: '조용히 생각에 잠겨요', type: 'WATER' }, { text: '음식을 먹거나 누군가와 대화해요', type: 'EARTH' }] },
    { question: '나의 약점은?', options: [{ text: '마무리가 약해요', type: 'WOOD' }, { text: '충동적으로 행동해요', type: 'FIRE' }, { text: '너무 완벽주의예요', type: 'METAL' }, { text: '결정을 미루는 편이에요', type: 'WATER' }, { text: '우유부단한 면이 있어요', type: 'EARTH' }] },
    { question: '내가 끌리는 직업 분야는?', options: [{ text: '교육·상담·복지 (木)', type: 'WOOD' }, { text: '예술·방송·마케팅 (火)', type: 'FIRE' }, { text: '법·의학·금융 (金)', type: 'METAL' }, { text: '연구·IT·철학 (水)', type: 'WATER' }, { text: '농업·건설·요식업 (土)', type: 'EARTH' }] },
  ];
}

function generateSajuResults() {
  return [
    {
      type: 'WOOD', emoji: '🌱',
      title: '목(木)의 기운 — 성장형',
      subtitle: '쑥쑥 자라는 새싹처럼 끊임없이 성장하는 유형',
      keywords: ['성장', '창의', '인자함', '시작', '유연성'],
      description: '목(木)의 기운이 강한 당신은 끊임없이 성장하고 새로운 것을 시작하는 에너지가 넘칩니다. 인자하고 따뜻하며, 사람들을 키우고 이끄는 교육자적 기질이 있습니다. 봄처럼 새로운 시작을 상징합니다.',
      traits: [{ label: '성장 에너지', value: 93 }, { label: '창의력', value: 88 }, { label: '인자함', value: 91 }, { label: '추진력', value: 85 }],
      strengths: ['새로운 시작을 두려워하지 않는 용기', '사람을 키우는 교육자적 기질', '유연하고 적응력 있는 성격'],
      growthPoints: ['시작한 것을 끝까지 마무리하기', '뿌리 깊은 인내심 키우기'],
      compatibility: [
        { emoji: '💚', type: '화(火)의 기운', relation: '목생화 — 최고의 시너지', desc: '나무가 불을 키우듯 서로를 성장시키는 이상적 관계' },
        { emoji: '🧡', type: '금(金)의 기운', relation: '금극목 — 주의 필요', desc: '쇠가 나무를 자르듯 갈등이 생길 수 있어요' },
      ],
      affiliates: [{ emoji: '📖', title: '사주 명리학 입문', desc: '오행으로 나를 이해하는 완전 가이드', url: '#affiliate-saju-1' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'FIRE', emoji: '🔥',
      title: '화(火)의 기운 — 열정형',
      subtitle: '타오르는 불꽃처럼 열정과 에너지가 넘치는 유형',
      keywords: ['열정', '카리스마', '표현', '따뜻함', '리더십'],
      description: '화(火)의 기운이 강한 당신은 뜨거운 열정과 강한 카리스마를 가지고 있습니다. 표현력이 뛰어나고 주변에 에너지를 전달하는 능력이 탁월합니다. 여름처럼 강렬하고 따뜻한 존재입니다.',
      traits: [{ label: '열정도', value: 96 }, { label: '카리스마', value: 92 }, { label: '표현력', value: 90 }, { label: '리더십', value: 88 }],
      strengths: ['강렬한 존재감과 카리스마', '주변에 활력을 전달', '빠른 판단력과 추진력'],
      growthPoints: ['충동적 행동 조절하기', '인내심과 끈기 키우기'],
      compatibility: [
        { emoji: '💚', type: '토(土)의 기운', relation: '화생토 — 좋은 관계', desc: '불이 흙을 만들듯 서로를 보완하는 관계' },
        { emoji: '🧡', type: '수(水)의 기운', relation: '수극화 — 주의 필요', desc: '물이 불을 끄듯 에너지가 충돌할 수 있어요' },
      ],
      affiliates: [{ emoji: '🔥', title: '사주로 보는 나의 운명', desc: '화의 기운을 가진 사람의 인생 가이드', url: '#affiliate-saju-2' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'EARTH', emoji: '🌍',
      title: '토(土)의 기운 — 안정형',
      subtitle: '든든한 땅처럼 모든 것을 품어주는 중심 유형',
      keywords: ['안정', '신뢰', '중재', '현실감각', '포용'],
      description: '토(土)의 기운이 강한 당신은 모든 것을 품어주는 대지처럼 안정적이고 신뢰할 수 있는 존재입니다. 뛰어난 중재 능력과 현실적 감각으로 어디서나 중심을 잡아주는 역할을 합니다.',
      traits: [{ label: '안정감', value: 95 }, { label: '신뢰도', value: 93 }, { label: '중재 능력', value: 90 }, { label: '현실감각', value: 88 }],
      strengths: ['모든 것을 수용하는 포용력', '뛰어난 중재·조율 능력', '흔들리지 않는 안정감'],
      growthPoints: ['우유부단함 극복하기', '자신의 의견도 분명히 표현하기'],
      compatibility: [
        { emoji: '💚', type: '금(金)의 기운', relation: '토생금 — 이상적인 관계', desc: '흙에서 금이 나오듯 서로를 성장시키는 관계' },
      ],
      affiliates: [{ emoji: '🌍', title: '사주 완전 정복', desc: '오행 균형으로 행복한 삶 만들기', url: '#affiliate-saju-3' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'METAL', emoji: '⚔️',
      title: '금(金)의 기운 — 원칙형',
      subtitle: '날카로운 검처럼 원칙과 정의를 추구하는 유형',
      keywords: ['원칙', '정의', '완벽주의', '결단력', '냉철함'],
      description: '금(金)의 기운이 강한 당신은 원칙과 정의를 중요시하는 단호한 성격입니다. 날카로운 판단력과 완벽주의적 기질로 어떤 일이든 높은 수준으로 마무리합니다.',
      traits: [{ label: '원칙성', value: 95 }, { label: '결단력', value: 91 }, { label: '완벽주의', value: 93 }, { label: '냉철함', value: 88 }],
      strengths: ['높은 기준과 완벽한 마무리', '강한 원칙과 정의감', '날카로운 분석력'],
      growthPoints: ['완벽주의 내려놓기', '유연성과 관용 키우기'],
      compatibility: [
        { emoji: '💚', type: '수(水)의 기운', relation: '금생수 — 좋은 관계', desc: '금속에서 물이 흐르듯 서로에게 영감을 주는 관계' },
      ],
      affiliates: [{ emoji: '⚔️', title: '사주로 보는 적성과 직업', desc: '금의 기운을 살린 인생 설계', url: '#affiliate-saju-4' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'WATER', emoji: '💧',
      title: '수(水)의 기운 — 지혜형',
      subtitle: '깊은 바다처럼 무한한 지혜와 깊이를 가진 유형',
      keywords: ['지혜', '유연성', '깊이', '직관', '신중함'],
      description: '수(水)의 기운이 강한 당신은 깊은 지혜와 뛰어난 직관력을 가지고 있습니다. 물처럼 어떤 상황에도 유연하게 적응하며, 깊이 있는 사고로 문제를 꿰뚫어 보는 능력이 있습니다.',
      traits: [{ label: '지혜', value: 94 }, { label: '직관력', value: 92 }, { label: '유연성', value: 90 }, { label: '신중함', value: 91 }],
      strengths: ['뛰어난 지혜와 통찰력', '유연한 적응 능력', '깊은 직관력'],
      growthPoints: ['결정력 키우기', '행동으로 옮기는 연습'],
      compatibility: [
        { emoji: '💚', type: '목(木)의 기운', relation: '수생목 — 이상적인 관계', desc: '물이 나무를 키우듯 서로를 성장시키는 관계' },
      ],
      affiliates: [{ emoji: '💧', title: '사주 명리학 심화 과정', desc: '수의 기운으로 지혜로운 삶', url: '#affiliate-saju-5' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
  ];
}

function generateSajuLoveQuiz() { return generateSajuQuiz().slice(0, 4); }
function generateSajuLoveResults() { return generateSajuResults(); }

function generateOhaengQuiz() { return generateSajuQuiz(); }
function generateOhaengResults() { return generateSajuResults(); }

function generateFortuneQuiz() {
  return [
    { question: '오늘 아침 일어났을 때 기분은?', options: [{ text: '상쾌하고 에너지 넘쳐요', type: 'GREAT' }, { text: '평범하게 괜찮아요', type: 'NORMAL' }, { text: '좀 피곤하고 무거워요', type: 'LOW' }] },
    { question: '오늘 가장 신경 쓰이는 분야는?', options: [{ text: '연애·인간관계', type: 'LOVE' }, { text: '돈·재물·사업', type: 'MONEY' }, { text: '건강·컨디션', type: 'HEALTH' }, { text: '공부·커리어', type: 'CAREER' }] },
    { question: '오늘 왠지 끌리는 색은?', options: [{ text: '빨강·오렌지 (열정, 활기)', type: 'GREAT' }, { text: '파랑·초록 (평온, 안정)', type: 'NORMAL' }, { text: '보라·남색 (직관, 신비)', type: 'MYSTIC' }, { text: '노랑·금색 (행운, 부)', type: 'LUCKY' }] },
    { question: '오늘 느낌상 어떤 하루일 것 같아요?', options: [{ text: '뭔가 좋은 일이 생길 것 같아요', type: 'LUCKY' }, { text: '평범하고 무난할 것 같아요', type: 'NORMAL' }, { text: '조심해야 할 것 같은 느낌', type: 'CAUTION' }] },
  ];
}

function generateFortuneResults() {
  return [
    {
      type: 'GREAT', emoji: '🌟',
      title: '오늘의 운세: 대길(大吉)',
      subtitle: '오늘은 모든 일이 순조롭게 풀리는 최고의 날!',
      keywords: ['행운', '성공', '긍정', '기회', '활기'],
      description: '오늘은 강한 길운이 흐르는 날입니다. 새로운 일을 시작하거나 중요한 결정을 내리기에 최적의 타이밍입니다. 특히 오전에 활동하면 더욱 좋은 결과를 얻을 수 있어요.',
      traits: [{ label: '전체 운', value: 95 }, { label: '연애운', value: 88 }, { label: '금전운', value: 91 }, { label: '건강운', value: 90 }],
      strengths: ['오늘 하루 강한 긍정 에너지', '새로운 시작에 최적의 날', '인간관계 운도 좋은 날'],
      growthPoints: ['과신은 금물, 겸손함 유지하기', '중요한 일은 오전에 처리'],
      compatibility: [],
      affiliates: [{ emoji: '🎴', title: '오늘의 타로·운세 완전 가이드', desc: '매일 운세 체크하는 습관 만들기', url: '#affiliate-fortune-1' }, ...DEFAULT_AFFILIATES.slice(0,3)],
    },
    {
      type: 'NORMAL', emoji: '🌤️',
      title: '오늘의 운세: 평길(平吉)',
      subtitle: '무난하고 안정적인 하루. 꾸준함이 답이에요.',
      keywords: ['안정', '꾸준함', '평화', '균형', '성실'],
      description: '오늘은 극적인 변화보다는 안정적으로 흘러가는 날입니다. 이미 진행 중인 일에 집중하고 루틴을 잘 지키면 좋은 결과를 얻을 수 있어요. 꾸준함이 오늘의 키워드입니다.',
      traits: [{ label: '전체 운', value: 75 }, { label: '연애운', value: 72 }, { label: '금전운', value: 74 }, { label: '건강운', value: 80 }],
      strengths: ['안정적이고 평화로운 하루', '루틴과 꾸준함에 좋은 날'],
      growthPoints: ['무리한 새 일은 잠시 보류', '체력 관리에 신경 쓰기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'LUCKY', emoji: '💰',
      title: '오늘의 운세: 금전 대길',
      subtitle: '재물운이 강하게 흐르는 날! 기회를 놓치지 마세요.',
      keywords: ['재물', '행운', '기회', '투자', '수익'],
      description: '오늘은 특히 금전운이 강하게 흐르는 날입니다. 오래 미뤄온 재정적 결정이나 새로운 기회가 찾아올 수 있으니 눈을 크게 뜨고 주변을 살펴보세요.',
      traits: [{ label: '전체 운', value: 88 }, { label: '연애운', value: 82 }, { label: '금전운', value: 97 }, { label: '건강운', value: 85 }],
      strengths: ['강한 금전·재물운', '새로운 기회 포착에 좋은 날'],
      growthPoints: ['충동 구매는 조심', '큰 투자는 신중히'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'CAUTION', emoji: '🌧️',
      title: '오늘의 운세: 조심 필요',
      subtitle: '오늘은 신중하게. 작은 것도 꼼꼼히 확인하세요.',
      keywords: ['신중', '조심', '확인', '인내', '준비'],
      description: '오늘은 새로운 시도보다는 기존의 것을 점검하고 정리하는 날로 활용하세요. 실수가 생기기 쉬운 날이므로 중요한 결정은 내일로 미루는 것도 방법입니다.',
      traits: [{ label: '전체 운', value: 60 }, { label: '연애운', value: 65 }, { label: '금전운', value: 58 }, { label: '건강운', value: 70 }],
      strengths: ['정리·점검에 좋은 날', '내면 성찰의 기회'],
      growthPoints: ['중요한 결정은 보류', '건강과 안전에 주의'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

// ===== 그 사람이 나를 그리워할까? =====
function generateMissMeQuiz() {
  return [
    { q: '마지막으로 연락했을 때 분위기는 어땠나요?', opts: ['따뜻하고 아쉬운 분위기', '평소와 다름없었어요', '어색하거나 차가웠어요', '크게 다퉜어요'] },
    { q: '헤어지거나 멀어진 이유는 무엇에 가깝나요?', opts: ['어쩔 수 없는 상황(거리·시간)', '서로 자연스럽게 멀어짐', '내가 먼저 거리를 뒀어요', '상대방이 연락을 끊었어요'] },
    { q: '상대방이 SNS나 메신저 프로필을 최근에 바꿨나요?', opts: ['자주 바꾸는 편이에요', '최근에 바뀐 것 같아요', '바꾼 것 같지 않아요', 'SNS를 잘 안 해요'] },
    { q: '예전에 함께했던 장소나 추억이 담긴 것들을 아직 갖고 있나요?', opts: ['네, 소중하게 간직해요', '일부는 있어요', '잘 모르겠어요', '아니요, 정리했어요'] },
    { q: '두 사람이 공유했던 취미나 관심사가 있나요?', opts: ['많이 공유했어요', '몇 가지 있었어요', '거의 없었어요', '전혀 달랐어요'] },
    { q: '상대방이 내 근황을 알 수 있는 방법이 있나요?', opts: ['공통 지인이 많아요', 'SNS로 볼 수 있어요', '거의 없어요', '완전히 차단 상태예요'] },
    { q: '우리가 함께했던 기간은 얼마나 되나요?', opts: ['1년 이상', '6개월~1년', '3~6개월', '3개월 미만'] },
    { q: '상대방이 나에게 어떤 감정을 느꼈다고 생각하나요?', opts: ['깊이 아꼈던 것 같아요', '좋아했던 것 같아요', '잘 모르겠어요', '별 감정이 없었던 것 같아요'] },
    { q: '헤어진 이후 상대방이 먼저 연락한 적 있나요?', opts: ['여러 번 있어요', '한두 번 있었어요', '없지만 간접적으로 반응했어요', '완전히 없었어요'] },
    { q: '지금 이 순간 상대방의 기분 상태는 어떨 것 같나요?', opts: ['많이 힘들 것 같아요', '무던히 지내는 것 같아요', '잘 모르겠어요', '잘 지내는 것 같아요'] },
    { q: '상대방은 감정을 잘 표현하는 편이었나요?', opts: ['매우 잘 표현해요', '보통이에요', '잘 표현 못 해요', '감정을 숨기는 편이에요'] },
    { q: '만약 지금 다시 연락이 온다면 어떻게 할 것 같아요?', opts: ['바로 반갑게 답할 것 같아요', '고민하다가 답할 것 같아요', '상황 봐서 결정할 것 같아요', '답하지 않을 것 같아요'] },
  ];
}
function generateMissMeResults() {
  return [
    {
      type: 'MISSING_HIGH',
      emoji: '💭',
      title: '그리워하고 있어요',
      subtitle: '상대방은 지금도 당신을 자주 떠올리고 있을 가능성이 높아요.',
      keywords: ['그리움', '추억', '미련', '연락 고민', '재회 가능성'],
      description: '관계의 흔적이 아직 선명하고, 서로 공유한 시간과 감정의 깊이가 상당했던 것으로 보입니다. 심리학적으로 이런 경우 상대방은 일상 속 작은 것들에서 당신을 떠올리는 경향이 있습니다. 연락을 망설이고 있을 수 있어요.',
      traits: [{ label: '그리움 지수', value: 85 }, { label: '재회 가능성', value: 72 }, { label: '감정 연결', value: 80 }, { label: '연락 가능성', value: 68 }],
      strengths: ['두 사람 사이의 감정적 연결이 아직 유효해요', '공유한 추억이 상대방에게도 소중한 기억으로 남아 있어요'],
      growthPoints: ['연락 여부는 내 감정과 상황을 먼저 정리한 뒤 결정하세요', '상대방을 기다리기보다 나 자신을 충전하는 시간을 가져봐요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'MISSING_MID',
      emoji: '🌙',
      title: '가끔은 생각하고 있어요',
      subtitle: '상대방은 특정 순간에 당신을 떠올리지만 적극적으로 행동하진 않을 거예요.',
      keywords: ['가끔 생각', '애매한 감정', '현재에 집중', '시간 필요'],
      description: '관계가 완전히 끝나지 않은 감정의 여운이 있지만, 상대방은 현재의 일상에 어느 정도 집중하고 있습니다. 특정 장소, 음악, 날씨 등에서 당신을 떠올리는 순간이 있을 거예요.',
      traits: [{ label: '그리움 지수', value: 58 }, { label: '재회 가능성', value: 45 }, { label: '감정 연결', value: 55 }, { label: '연락 가능성', value: 40 }],
      strengths: ['감정이 완전히 사라지지는 않았어요', '두 사람이 평화롭게 마무리한 기억이 있어요'],
      growthPoints: ['지금은 나를 위한 시간에 집중하는 게 더 중요해요', '상대방의 반응에 너무 의미를 두지 않도록 해봐요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'MISSING_LOW',
      emoji: '🍃',
      title: '많이 생각하진 않을 것 같아요',
      subtitle: '상대방은 현재 자신의 삶에 집중하고 있을 가능성이 높아요.',
      keywords: ['새출발', '현재 집중', '성장 기회', '나를 위한 시간'],
      description: '분석 결과, 상대방이 당신을 자주 그리워하고 있을 가능성은 낮아 보입니다. 이것이 슬픈 소식처럼 느껴질 수 있지만, 오히려 당신도 자신의 삶과 감정에 더 집중할 수 있는 기회예요.',
      traits: [{ label: '그리움 지수', value: 30 }, { label: '재회 가능성', value: 25 }, { label: '감정 연결', value: 35 }, { label: '연락 가능성', value: 20 }],
      strengths: ['이 경험이 당신을 더 성장시켜 줄 거예요', '새로운 관계와 가능성을 향해 마음을 열 수 있어요'],
      growthPoints: ['과거에 머물기보다 앞으로 나아가는 용기를 가져보세요', '나 자신을 먼저 사랑하는 연습을 해보세요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

// ===== 오행 기반 관계 분석 (직장/가족) =====
function generateRelationQuiz(type) {
  if (type === 'workplace') {
    return [
      { q: '직장에서 상대방과 얼마나 자주 같이 일하나요?', opts: ['매일 같이 일해요', '주 2~3회 협업해요', '가끔 함께해요', '거의 별개로 일해요'] },
      { q: '상대방의 업무 스타일은 어떤가요?', opts: ['계획적·꼼꼼해요', '창의적·자유로워요', '빠르고 실행 중심이에요', '신중하고 느긋해요'] },
      { q: '의견 충돌이 생기면 어떻게 해결하나요?', opts: ['대화로 잘 풀려요', '한 명이 양보해요', '제3자가 중재해요', '해결 없이 넘어가요'] },
      { q: '상대방에 대한 첫인상은 어땠나요?', opts: ['믿음직하고 좋았어요', '평범했어요', '조금 어색했어요', '불편했어요'] },
      { q: '업무 외 사적인 대화도 나누나요?', opts: ['자주 나눠요', '가끔 해요', '거의 안 해요', '전혀 안 해요'] },
      { q: '상대방이 실수했을 때 나는 어떻게 반응하나요?', opts: ['도와주고 이해해요', '조용히 지나쳐요', '아쉬운 티를 내요', '직접 지적해요'] },
      { q: '상대방이 나의 의견을 얼마나 존중하나요?', opts: ['많이 존중해요', '보통이에요', '별로 안 해요', '무시하는 것 같아요'] },
      { q: '같은 프로젝트를 하게 된다면 어떨 것 같나요?', opts: ['잘 될 것 같아요', '괜찮을 것 같아요', '걱정이 좀 돼요', '불안해요'] },
      { q: '상대방이 나에 대해 어떻게 생각할 것 같나요?', opts: ['좋게 보는 것 같아요', '평범하게 봐요', '잘 모르겠어요', '불편해 하는 것 같아요'] },
      { q: '지금 이 관계에서 가장 원하는 것은 무엇인가요?', opts: ['더 친해지고 싶어요', '협업이 잘 되길 원해요', '갈등 없이 지내길 원해요', '거리를 두고 싶어요'] },
    ];
  }
  return [
    { q: '가족 구성원과 얼마나 자주 대화하나요?', opts: ['매일 대화해요', '주 2~3회 대화해요', '가끔 대화해요', '거의 대화 안 해요'] },
    { q: '가족과의 관계에서 주로 어떤 역할을 맡나요?', opts: ['중재자·화해 담당', '든든한 지원자', '분위기 메이커', '독립적으로 지내요'] },
    { q: '가족 간에 갈등이 있을 때 어떻게 대처하나요?', opts: ['직접 대화로 해결해요', '시간이 지나면 자연스럽게 풀려요', '다른 가족이 중간 역할을 해요', '피하거나 회피해요'] },
    { q: '가족이 나에게 기대하는 것은 무엇인 것 같나요?', opts: ['성공과 안정', '가족을 잘 챙기길', '행복하게 살길', '독립적으로 살길'] },
    { q: '가족과 함께 보내는 시간은 어떤 편인가요?', opts: ['따뜻하고 편안해요', '그럭저럭이에요', '때로 불편해요', '부담스러워요'] },
    { q: '상대 가족 구성원의 성격은 어떤가요?', opts: ['적극적이고 활발해요', '차분하고 신중해요', '감성적이고 다정해요', '현실적이고 실용적이에요'] },
    { q: '가족과의 관계에서 가장 힘든 점은 무엇인가요?', opts: ['서로 다른 가치관', '소통의 어려움', '거리나 바쁜 일상', '과거의 상처'] },
    { q: '가족에게 솔직한 감정을 표현할 수 있나요?', opts: ['잘 표현해요', '가끔은 표현해요', '어려운 편이에요', '거의 못 해요'] },
    { q: '앞으로 가족 관계가 어떻게 변하길 원하나요?', opts: ['더 가까워지고 싶어요', '지금처럼 유지되길 원해요', '각자 독립적이길 원해요', '변화가 필요해요'] },
    { q: '가족 구성원이 힘들 때 나는 어떻게 하나요?', opts: ['먼저 다가가서 도와요', '물어봐 주고 지지해요', '간접적으로 돕기 위해 노력해요', '각자 해결하는 게 낫다고 생각해요'] },
  ];
}
function generateRelationResults(type) {
  if (type === 'workplace') {
    return [
      {
        type: 'SYNERGY',
        emoji: '🤝',
        title: '최고의 업무 파트너',
        subtitle: '오행 분석 결과, 두 사람의 에너지가 서로를 보완해줍니다.',
        keywords: ['시너지', '협력', '신뢰', '성장', '최강 팀'],
        description: '두 사람의 타고난 기운이 직장에서 강한 시너지를 발휘하는 조합입니다. 서로의 부족한 부분을 자연스럽게 채워주며, 함께할수록 더 좋은 결과를 만들어낼 수 있어요.',
        traits: [{ label: '협력 지수', value: 90 }, { label: '신뢰도', value: 85 }, { label: '시너지', value: 92 }, { label: '갈등 가능성', value: 15 }],
        strengths: ['서로의 강점이 상호 보완돼요', '자연스럽게 팀워크가 형성돼요'],
        growthPoints: ['의견 충돌 시 솔직한 대화로 더 단단해질 수 있어요', '장기적 신뢰 관계를 위해 개인 경계도 존중해요'],
        compatibility: [],
        affiliates: DEFAULT_AFFILIATES,
      },
      {
        type: 'BALANCE',
        emoji: '⚖️',
        title: '균형 잡힌 직장 관계',
        subtitle: '서로 다른 기운이 균형을 이루는 안정적인 관계예요.',
        keywords: ['균형', '안정', '조화', '노력', '이해'],
        description: '두 사람의 오행 에너지는 서로 다르지만, 그렇기 때문에 오히려 균형을 이룰 수 있는 조합입니다. 서로의 방식을 이해하고 존중한다면 안정적이고 지속 가능한 직장 관계를 만들 수 있어요.',
        traits: [{ label: '협력 지수', value: 68 }, { label: '신뢰도', value: 70 }, { label: '시너지', value: 60 }, { label: '갈등 가능성', value: 35 }],
        strengths: ['각자의 역할이 명확해져요', '서로 다른 시각으로 더 나은 결정을 내릴 수 있어요'],
        growthPoints: ['소통 방식의 차이를 인정하고 맞춰가는 연습이 필요해요', '작은 감사 표현이 관계를 더 좋게 만들어줘요'],
        compatibility: [],
        affiliates: DEFAULT_AFFILIATES,
      },
      {
        type: 'CHALLENGE',
        emoji: '🌿',
        title: '성장이 필요한 관계',
        subtitle: '지금은 약간 어렵지만, 노력하면 좋아질 수 있어요.',
        keywords: ['도전', '인내', '성장', '이해 필요', '노력'],
        description: '현재 두 사람의 에너지 흐름이 다소 충돌하는 경향이 있습니다. 하지만 이런 관계는 서로를 성장시키는 가장 강력한 계기가 되기도 해요.',
        traits: [{ label: '협력 지수', value: 45 }, { label: '신뢰도', value: 50 }, { label: '시너지', value: 38 }, { label: '갈등 가능성', value: 65 }],
        strengths: ['어려운 관계를 극복하면 더 단단해질 수 있어요', '서로에게서 배울 점이 많아요'],
        growthPoints: ['먼저 작은 친절을 시도해보세요', '업무 외 대화로 서로를 더 이해해보세요'],
        compatibility: [],
        affiliates: DEFAULT_AFFILIATES,
      },
    ];
  }
  return [
    {
      type: 'HARMONY',
      emoji: '🌸',
      title: '깊은 인연으로 연결된 가족',
      subtitle: '오행 분석 결과, 두 분의 기운이 서로를 지지하고 보완해요.',
      keywords: ['인연', '유대감', '지지', '따뜻함', '함께'],
      description: '두 분의 사주 에너지는 서로를 자연스럽게 지지하고 보완하는 좋은 인연입니다. 힘들 때 서로에게 기대고, 기쁠 때 함께 나눌 수 있는 관계예요.',
      traits: [{ label: '유대감', value: 88 }, { label: '신뢰도', value: 90 }, { label: '소통 지수', value: 82 }, { label: '갈등 가능성', value: 18 }],
      strengths: ['서로의 힘든 순간을 직관적으로 알아채요', '함께할수록 에너지가 충전돼요'],
      growthPoints: ['각자의 개인 공간도 존중해주세요', '솔직한 감정 표현이 관계를 더 깊게 만들어요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'GROWTH_FAMILY',
      emoji: '🌱',
      title: '함께 성장하는 가족 관계',
      subtitle: '서로 다른 기운이 만나 더 풍요로운 관계를 만들어가요.',
      keywords: ['성장', '배움', '다름', '이해', '노력'],
      description: '두 분의 기운이 다르기 때문에 때로는 이해하기 어려운 순간도 있겠지만, 그 차이가 오히려 서로를 성장시키는 원동력이 됩니다.',
      traits: [{ label: '유대감', value: 65 }, { label: '신뢰도', value: 72 }, { label: '소통 지수', value: 60 }, { label: '갈등 가능성', value: 40 }],
      strengths: ['서로에게서 새로운 시각을 배울 수 있어요', '다름을 인정하면 관계가 훨씬 편안해져요'],
      growthPoints: ['대화의 빈도를 조금 늘려보세요', '서로의 감정을 먼저 공감해주는 연습을 해보세요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'HEAL_FAMILY',
      emoji: '💛',
      title: '치유가 필요한 가족 관계',
      subtitle: '과거의 상처와 오해를 풀면 훨씬 좋아질 수 있어요.',
      keywords: ['치유', '대화', '이해', '회복', '용기'],
      description: '현재 두 분의 에너지 흐름에 막힘이 있는 것 같아요. 오랫동안 쌓인 오해나 각자의 상처가 관계를 어렵게 만들고 있을 수 있습니다.',
      traits: [{ label: '유대감', value: 48 }, { label: '신뢰도', value: 55 }, { label: '소통 지수', value: 42 }, { label: '갈등 가능성', value: 58 }],
      strengths: ['지금 이 관계를 돌아보고 있다는 것 자체가 큰 용기예요', '회복하고 싶은 마음이 있다면 가능성은 항상 있어요'],
      growthPoints: ['먼저 다가가는 작은 용기를 내보세요', '과거의 상처를 꺼내 이야기하는 시간을 만들어보세요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

// =====================================================
// MBTI 동물 유형 테스트
// =====================================================
function generateMbtiAnimalQuiz() {
  return [
    {question: '주말 오전, 나는?', options: [
      {text: '🛋️ 혼자 넷플릭스·책으로 힐링', type: 'cat'},
      {text: '📞 친구 불러서 신나게 놀기', type: 'dog'},
      {text: '🔍 새로운 정보 탐색하고 공부', type: 'owl'},
      {text: '🗺️ 새로운 장소 탐방하러 나가기', type: 'fox'},
    ]},
    {question: '친구들 사이에서 나의 포지션은?', options: [
      {text: '🎤 항상 웃기고 에너지 넘치는 분위기 메이커', type: 'dog'},
      {text: '👑 자연스럽게 리더 역할을 맡게 되는 편', type: 'lion'},
      {text: '🤗 모두를 따뜻하게 챙기는 마음 쓰는 역할', type: 'dolphin'},
      {text: '👀 조용히 관찰하다가 핵심 한마디 하는 편', type: 'wolf'},
    ]},
    {question: '스트레스받을 때 나는?', options: [
      {text: '🏠 혼자 방에 틀어박혀 충전', type: 'owl'},
      {text: '💬 친구한테 털어놓고 수다 떨기', type: 'dolphin'},
      {text: '🧩 원인 분석하고 해결책 찾기', type: 'fox'},
      {text: '🌲 조용히 산책하며 혼자 정리', type: 'wolf'},
    ]},
    {question: '결정을 내릴 때 나는?', options: [
      {text: '💫 느낌과 감을 믿고 결정', type: 'cat'},
      {text: '📊 데이터와 논리로 철저히 분석', type: 'owl'},
      {text: '⚡ 빠르게 직관적으로 결정', type: 'lion'},
      {text: '🤝 주변 사람들 의견 듣고 결정', type: 'bear'},
    ]},
    {question: '나를 가장 잘 설명하는 단어는?', options: [
      {text: '🌙 독립적·감성적·내 세계 있는', type: 'cat'},
      {text: '☀️ 활발·긍정적·에너지 넘치는', type: 'dog'},
      {text: '🦾 카리스마·추진력·목표 지향적', type: 'lion'},
      {text: '💙 따뜻함·공감·사람을 소중히', type: 'dolphin'},
    ]},
    {question: '처음 보는 사람을 만났을 때?', options: [
      {text: '😅 살짝 긴장, 먼저 말 걸기 어려움', type: 'cat'},
      {text: '😄 반갑게 먼저 다가가서 인사', type: 'dog'},
      {text: '🧐 관심 있는 부분 바로 질문', type: 'fox'},
      {text: '🔎 상대방을 먼저 파악한 뒤 접근', type: 'owl'},
    ]},
    {question: '내가 가장 중요하게 생각하는 가치는?', options: [
      {text: '🗝️ 자유와 자신만의 공간', type: 'cat'},
      {text: '🌊 깊고 의미 있는 인간 관계', type: 'wolf'},
      {text: '🚀 성장과 끊임없는 새로운 도전', type: 'fox'},
      {text: '🏡 안정과 믿음직한 신뢰', type: 'bear'},
    ]},
    {question: '팀 프로젝트에서 나의 역할은?', options: [
      {text: '✅ 혼자 맡은 부분 완벽하게 처리', type: 'owl'},
      {text: '🎉 분위기 띄우고 소통 담당', type: 'dog'},
      {text: '🎯 전체 방향 잡고 팀을 이끌기', type: 'lion'},
      {text: '💛 팀원 감정 챙기고 화합 유지', type: 'dolphin'},
    ]},
    {question: '연애할 때 나의 스타일은?', options: [
      {text: '🐱 독립적이지만 좋아하면 올인', type: 'cat'},
      {text: '🐶 먼저 다가가고 애정 표현 많이', type: 'dog'},
      {text: '🦁 이끌어가는 적극적 스타일', type: 'lion'},
      {text: '🐺 깊이 있는 교감을 원하는 스타일', type: 'wolf'},
    ]},
    {question: '친구들이 나에게 많이 하는 말은?', options: [
      {text: '"너 왜 이렇게 감성적이야 ㅠㅠ"', type: 'cat'},
      {text: '"너 없으면 분위기가 안 살아!"', type: 'dog'},
      {text: '"너 진짜 다 알고 있는 것 같아"', type: 'fox'},
      {text: '"너한테 기대면 항상 든든해"', type: 'bear'},
    ]},
  ];
}

function generateMbtiAnimalResults() {
  return [
    {
      type: 'cat',
      title: '🐱 감성 고양이형',
      subtitle: 'INFP · ISFP 계열',
      emoji: '🐱',
      keywords: ['독립적', '감성적', '예민한', '자유로운', '내 세계 있는'],
      description: '자신만의 독특한 세계관을 가진 감성파예요. 혼자만의 시간을 소중히 여기지만 좋아하는 사람에게는 한없이 따뜻하고 충성스러워요. 속으로 생각이 많고 예민하지만 그 감수성이 바로 최대 강점이에요! 겉으론 쿨해 보여도 사실 감동받고 눈물 뚝뚝 흘리는 타입 ㅋㅋ',
      strengths: ['깊은 감수성과 창의성이 뛰어나요', '한번 믿으면 한없이 충성스러운 관계를 맺어요'],
      growthPoints: ['가끔은 먼저 다가가는 연습을 해보세요', '나만의 감정을 글이나 예술로 표현해보세요'],
      compatibility: [{emoji:'🐶', type:'강아지형', relation:'최고의 궁합', desc:'활발한 강아지형이 고양이형에게 세상을 보여줘요.'},{emoji:'🐺', type:'늑대형', relation:'깊은 교감', desc:'둘 다 내면 세계가 풍부해 말 없이도 통해요.'}],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'dog',
      title: '🐶 활발한 강아지형',
      subtitle: 'ENFP · ESFP 계열',
      emoji: '🐶',
      keywords: ['활발함', '사교적', '충성스러운', '긍정적', '에너지 넘치는'],
      description: '사람들을 좋아하고 밝은 에너지로 주변을 행복하게 만드는 타입이에요. 충성스럽고 솔직하며 관계에서 큰 만족을 얻어요. 당신 주변에 항상 사람이 많은 건 우연이 아니에요! 가끔 너무 모든 걸 받아주다가 지치는 경우가 있으니 나 자신도 챙겨주세요.',
      strengths: ['밝은 에너지로 주변을 행복하게 만들어요', '솔직하고 따뜻해서 사람들이 쉽게 마음을 열어요'],
      growthPoints: ['때로는 혼자만의 충전 시간도 필요해요', '거절하는 연습을 해보면 더 건강한 관계가 돼요'],
      compatibility: [{emoji:'🦉', type:'올빼미형', relation:'완벽한 균형', desc:'올빼미의 깊이와 강아지의 에너지가 시너지를 내요.'},{emoji:'🐬', type:'돌고래형', relation:'최고의 케미', desc:'둘 다 사람을 좋아해 함께하면 더 빛나요.'}],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'fox',
      title: '🦊 영리한 여우형',
      subtitle: 'ENTP · INTJ 계열',
      emoji: '🦊',
      keywords: ['영리함', '전략적', '호기심 많은', '독창적', '빠른 눈치'],
      description: '눈치 빠르고 전략적인 사고를 가진 타입이에요. 어떤 상황에서도 빠르게 파악하고 최선의 방법을 찾아내요. 호기심이 넘치고 새로운 것에 끌리는 영원한 탐구자예요. 사람들이 "어떻게 알았어?"라는 말을 자주 듣는 유형!',
      strengths: ['어떤 상황에서도 빠르게 최선책을 찾아내요', '창의적인 아이디어와 독창적인 관점을 가졌어요'],
      growthPoints: ['감정도 논리만큼 중요하다는 걸 기억해요', '아이디어를 끝까지 실행하는 연습을 해보세요'],
      compatibility: [{emoji:'🦁', type:'사자형', relation:'드림팀', desc:'여우의 전략과 사자의 추진력이 만나면 무적이에요.'},{emoji:'🦉', type:'올빼미형', relation:'지적 시너지', desc:'깊이 있는 대화가 끊이지 않는 조합이에요.'}],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'lion',
      title: '🦁 카리스마 사자형',
      subtitle: 'ENTJ · ESTJ 계열',
      emoji: '🦁',
      keywords: ['리더십', '카리스마', '추진력', '목표 지향', '결단력'],
      description: '타고난 리더십으로 자연스럽게 앞에 서게 되는 타입이에요. 목표 의식이 강하고 추진력이 넘쳐요. 한번 마음먹으면 반드시 이루고 마는 집념의 소유자! 가끔 너무 강하게 밀어붙이다가 주변이 지칠 수 있으니 배려도 챙겨봐요.',
      strengths: ['명확한 목표 의식과 강한 추진력을 가졌어요', '어려운 결정도 자신감 있게 내릴 수 있어요'],
      growthPoints: ['주변 사람들의 속도도 배려해주세요', '완벽주의를 조금 내려놓으면 더 행복해져요'],
      compatibility: [{emoji:'🦊', type:'여우형', relation:'드림팀', desc:'사자의 추진력에 여우의 전략이 더해져 최강 조합이에요.'},{emoji:'🐬', type:'돌고래형', relation:'힘의 균형', desc:'돌고래형이 사자형의 날카로운 면을 부드럽게 만들어줘요.'}],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'dolphin',
      title: '🐬 따뜻한 돌고래형',
      subtitle: 'ENFJ · ESFJ 계열',
      emoji: '🐬',
      keywords: ['공감력', '따뜻함', '소통 장인', '팀플레이', '모두를 챙김'],
      description: '공감 능력이 최고치인 타입이에요. 사람들과의 연결을 소중히 여기고 팀 분위기를 살리는 능력이 탁월해요. 돌고래처럼 유쾌하고 따뜻해서 모두가 좋아하는 유형! 다른 사람 감정을 너무 잘 받아들여서 내 감정을 잃을 수 있으니 나 자신을 먼저 돌봐요.',
      strengths: ['공감 능력이 최고 수준이에요', '팀 분위기를 살리고 모두를 편안하게 만들어요'],
      growthPoints: ['내 감정과 필요도 소중하다는 걸 기억해요', '때로는 No라고 말하는 연습이 필요해요'],
      compatibility: [{emoji:'🐶', type:'강아지형', relation:'에너지 궁합', desc:'둘 다 사람을 좋아해 함께하면 최고의 분위기를 만들어요.'},{emoji:'🦁', type:'사자형', relation:'상호 보완', desc:'돌고래의 따뜻함이 사자의 강함을 균형 있게 만들어줘요.'}],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'owl',
      title: '🦉 분석하는 올빼미형',
      subtitle: 'INTJ · INTP 계열',
      emoji: '🦉',
      keywords: ['분석적', '깊이 있는', '논리적', '통찰력', '조용한 천재'],
      description: '깊이 생각하고 분석하는 걸 즐기는 타입이에요. 겉으로는 조용해 보여도 내면 세계가 엄청나게 풍부해요. 남들이 보지 못하는 것을 보고 복잡한 문제도 쉽게 해결하는 조용한 천재 유형! 생각을 행동으로 옮기는 속도가 느릴 수 있으니 일단 시작해보는 연습을 해봐요.',
      strengths: ['깊은 통찰력과 분석 능력이 탁월해요', '한번 집중하면 놀라운 결과물을 만들어내요'],
      growthPoints: ['완벽한 계획보다 일단 시작해보는 용기가 필요해요', '감정 표현을 조금씩 연습해보세요'],
      compatibility: [{emoji:'🐶', type:'강아지형', relation:'완벽한 균형', desc:'강아지형의 활발함이 올빼미형에게 세상을 보여줘요.'},{emoji:'🦊', type:'여우형', relation:'지적 시너지', desc:'둘 다 지식욕이 강해 대화가 끊이지 않아요.'}],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'bear',
      title: '🐻 든든한 곰형',
      subtitle: 'ISFJ · ISTJ 계열',
      emoji: '🐻',
      keywords: ['든든함', '믿음직한', '안정적', '의리', '약속은 생명'],
      description: '한번 마음을 준 사람에겐 끝까지 든든한 지원군이 되는 타입이에요. 안정적이고 믿음직하며 약속을 꼭 지키는 신뢰 그 자체예요. 주변 사람들이 가장 의지하고 싶어하는 유형! 작은 변화에 도전하는 연습을 해보면 더 넓은 세계가 열려요.',
      strengths: ['신뢰와 의리로 주변 사람들에게 든든한 존재예요', '책임감이 강해 맡은 일은 반드시 해내요'],
      growthPoints: ['작은 변화와 새로운 도전을 두려워하지 마세요', '나의 감정과 필요도 표현해보세요'],
      compatibility: [{emoji:'🐶', type:'강아지형', relation:'가장 든든한 조합', desc:'강아지의 활발함과 곰의 안정감이 서로를 채워줘요.'},{emoji:'🐬', type:'돌고래형', relation:'따뜻한 신뢰', desc:'둘 다 사람을 소중히 여겨 깊고 안정적인 관계를 만들어요.'}],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'wolf',
      title: '🐺 신비로운 늑대형',
      subtitle: 'INFJ 계열',
      emoji: '🐺',
      keywords: ['신비로운', '직관적', '내면이 깊은', '충성스러운', '혼자가 편한'],
      description: '혼자 있는 것처럼 보여도 사실 깊은 유대감을 원하는 타입이에요. 강한 직관력과 신비로운 분위기를 가지고 있어요. 마음을 열기까지 시간이 걸리지만 한번 믿으면 영원히 곁에 있는 유형! 전 세계에서 가장 희귀한 MBTI 계열이에요.',
      strengths: ['강한 직관력으로 본질을 꿰뚫어봐요', '한번 믿은 사람에겐 영원히 곁에 있는 충성스러운 타입이에요'],
      growthPoints: ['마음을 여는 속도를 조금 높여봐요', '혼자만 짊어지지 말고 주변에 기대보세요'],
      compatibility: [{emoji:'🐱', type:'고양이형', relation:'내면의 공명', desc:'둘 다 내면 세계가 깊어 말 없이도 통하는 조합이에요.'},{emoji:'🐬', type:'돌고래형', relation:'따뜻한 균형', desc:'돌고래형의 따뜻함이 늑대형의 마음을 열어줘요.'}],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}

// =====================================================
// 짝사랑 성공률 테스트
// =====================================================
function generateCrushQuiz() {
  return [
    {question: '짝사랑 상대와 나의 현재 관계는?', options: [
      {text: '😶 거의 모르는 사이 (같은 공간에 있는 정도)', type: '1'},
      {text: '👋 아는 사이 (가끔 인사하고 대화는 가끔)', type: '2'},
      {text: '😊 꽤 친한 편 (자주 얘기하고 연락도 종종)', type: '3'},
      {text: '🤗 매우 친함 (개인적인 이야기도 나누는 사이)', type: '4'},
    ]},
    {question: '상대방이 나에게 먼저 연락한 적이 있나요?', options: [
      {text: '❌ 한 번도 없어요', type: '1'},
      {text: '🤔 특별한 용건이 있을 때만 가끔', type: '2'},
      {text: '✅ 가끔 이유 없이 연락해요', type: '3'},
      {text: '💬 자주 먼저 연락해요', type: '4'},
    ]},
    {question: '상대방이 나를 볼 때 반응은?', options: [
      {text: '😐 특별히 반응 없음 (무관심한 편)', type: '1'},
      {text: '🙂 보통 반응 (특별히 더 좋아하지는 않는 것 같음)', type: '2'},
      {text: '😄 밝게 반응해줌 (표정이 좋아지거나 웃음)', type: '3'},
      {text: '😍 눈 마주치면 피하거나 유난히 긴장해 보임', type: '4'},
    ]},
    {question: '단둘이 만난 적 있나요?', options: [
      {text: '❌ 한 번도 없어요', type: '1'},
      {text: '☕ 우연히 잠깐 함께한 적 있어요', type: '2'},
      {text: '🍽️ 일부러 단둘이 만난 적 있어요', type: '4'},
    ]},
    {question: '상대방이 내 작은 이야기를 기억하나요?', options: [
      {text: '😓 기억 못 하는 것 같아요', type: '1'},
      {text: '🤷 기억할 때도 있고 아닐 때도 있어요', type: '2'},
      {text: '😮 작은 것까지 잘 기억해줘요', type: '4'},
    ]},
    {question: '상대방의 현재 연애 상태는?', options: [
      {text: '💑 연인이 있는 것 같아요', type: '1'},
      {text: '❓ 잘 모르겠어요', type: '2'},
      {text: '💚 솔로인 것 같아요', type: '3'},
    ]},
    {question: '상대방이 나를 대하는 태도가?', options: [
      {text: '😑 다른 사람이랑 별 차이 없어요', type: '1'},
      {text: '🙂 나한테는 살짝 더 친근한 것 같기도 해요', type: '2'},
      {text: '😊 나한테 유독 잘해주는 것 같아요', type: '3'},
      {text: '💕 나한테만 특별하게 대해주는 게 느껴져요', type: '4'},
    ]},
    {question: '우리 사이의 공통 관심사는?', options: [
      {text: '🤔 딱히 공통점이 없어요', type: '1'},
      {text: '👍 하나 정도 있어요', type: '2'},
      {text: '✨ 여러 개 있어요', type: '3'},
      {text: '🎯 공통점도 많고 같이 즐기는 것도 있어요', type: '4'},
    ]},
    {question: '상대방과 눈이 마주칠 때?', options: [
      {text: '😶 눈 마주치는 일이 거의 없어요', type: '1'},
      {text: '😊 자연스럽게 마주치고 그냥 지나쳐요', type: '2'},
      {text: '😳 자주 마주치고 서로 어색하게 웃어요', type: '3'},
      {text: '💓 눈이 마주치면 한쪽이 먼저 피하는 느낌이에요', type: '4'},
    ]},
    {question: '내 직감은 어때요?', options: [
      {text: '😞 솔직히 별 관심 없는 것 같아요...', type: '1'},
      {text: '🤔 모르겠어요, 애매해요', type: '2'},
      {text: '💭 나를 좋아할 수도 있겠다 싶어요', type: '3'},
      {text: '💗 분명히 나를 의식하고 있는 것 같아요!', type: '4'},
    ]},
  ];
}

function generateCrushResults() {
  return [
    {
      type: 'score_very_low',
      title: '아직은 일방적인 짝사랑 💔',
      subtitle: '성공률 10~20%',
      emoji: '💔',
      keywords: ['아직 초기 단계', '상대방이 모를 수도', '용기가 필요'],
      description: '현재로서는 상대방이 나를 특별하게 인식하지 못하고 있을 가능성이 높아요. 하지만 지금부터가 시작이에요! 갑자기 고백하기보다는 먼저 자연스러운 대화를 늘려서 관계를 쌓아가는 것이 좋아요.',
      strengths: ['지금 이 감정을 느낀다는 것 자체가 소중해요', '처음부터 차근차근 쌓아가는 것이 가장 단단한 관계가 돼요'],
      growthPoints: ['먼저 친해지는 것부터 시작해보세요', '공통 관심사를 찾아서 자연스럽게 대화해보세요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'score_low',
      title: '관심은 있을 수도... 🌱',
      subtitle: '성공률 30~45%',
      emoji: '🌱',
      keywords: ['관심 생기는 중', '아직 확신은 없음', '더 친해져야 함'],
      description: '상대방이 나에게 조금씩 관심을 가지고 있을 가능성이 있어요. 아직 확신하기는 이르지만 분명히 가능성은 있어요! 지금보다 접점을 더 늘리고, 나의 좋은 면을 자연스럽게 보여주는 것이 중요해요.',
      strengths: ['가능성의 씨앗이 있어요, 물을 주면 자라요', '조급해하지 않는 여유가 오히려 매력이 될 수 있어요'],
      growthPoints: ['접점을 늘리고 공통 취미로 자연스럽게 가까워지기', '나의 좋은 면을 꾸밈없이 보여주는 기회를 만들어요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'score_mid',
      title: '가능성 충분히 있어요! 💛',
      subtitle: '성공률 50~65%',
      emoji: '💛',
      keywords: ['서로 의식 중', '긍정적 신호 있음', '타이밍이 중요'],
      description: '상대방이 나를 꽤 의식하고 있는 신호들이 보여요! 가능성이 충분히 있는 단계예요. 너무 서두르지 말고 자연스럽게 단둘이 만날 기회를 만들어봐요. 상대방이 편안하게 느낄 수 있는 환경이 핵심이에요.',
      strengths: ['서로 의식하는 긍정적인 신호가 보여요', '지금 이 감정을 적절히 표현하면 충분히 가능성 있어요'],
      growthPoints: ['단둘이 만날 자연스러운 기회를 만들어보세요', '적절한 타이밍에 감정을 조금씩 표현해봐요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'score_high',
      title: '거의 확실한 신호들! 💕',
      subtitle: '성공률 70~80%',
      emoji: '💕',
      keywords: ['상호 관심 신호', '감정 표현 준비 OK', '용기 있게 GO!'],
      description: '상대방도 나를 꽤 특별하게 생각하고 있을 가능성이 높아요! 지금 신호들은 분명히 긍정적이에요. 완벽한 타이밍을 기다리기보다 지금의 좋은 감정이 유지될 때 용기 있게 마음을 전해보세요!',
      strengths: ['상대방이 나를 특별하게 대한다는 신호가 있어요', '지금 분위기는 충분히 고백을 준비할 만해요'],
      growthPoints: ['고백 준비하기! 단둘이 좋은 시간을 보낸 뒤 마음 전하기', '완벽한 타이밍을 너무 오래 기다리지 마세요'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
    {
      type: 'score_very_high',
      title: '이미 좋아하는 것 같아요! 💗',
      subtitle: '성공률 85~95%',
      emoji: '💗',
      keywords: ['상대도 관심 있음', '이미 서로 의식 중', '고백만 남았어요!'],
      description: '축하해요! 상대방도 이미 나를 특별하게 생각하고 있을 가능성이 매우 높아요. 더 이상 망설이지 말고 고백해보세요! 기다릴수록 타이밍을 놓칠 수 있어요. 상대방도 당신의 고백을 기다리고 있을지도 몰라요!',
      strengths: ['상대방이 나를 이미 특별하게 의식하고 있어요', '지금 이 타이밍이 최고의 순간이에요'],
      growthPoints: ['지금 당장 고백 준비 시작하기!', '분위기 좋은 날 진심을 담아 마음 전달하기'],
      compatibility: [],
      affiliates: DEFAULT_AFFILIATES,
    },
  ];
}
