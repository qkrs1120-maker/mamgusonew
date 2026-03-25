// Supabase REST API 공통 헬퍼 (npm 없이 fetch 사용)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function sbHeaders(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

// users 테이블에서 uid로 1건 조회
async function getUser(uid) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/users?uid=eq.${encodeURIComponent(uid)}&select=uid,credit,created_at`,
    { headers: sbHeaders() }
  );
  if (!res.ok) throw new Error(`Supabase GET error ${res.status}`);
  const rows = await res.json();
  return rows[0] || null;
}

// 신규 유저 생성 (100 크레딧 지급)
async function createUser(uid) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
    method: 'POST',
    headers: sbHeaders({ Prefer: 'return=representation' }),
    body: JSON.stringify({ uid, credit: 100 }),
  });
  if (!res.ok) throw new Error(`Supabase POST error ${res.status}`);
  const rows = await res.json();
  return rows[0];
}

// 크레딧 업데이트 (amount 절대값으로 설정)
async function setUserCredit(uid, credit) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/users?uid=eq.${encodeURIComponent(uid)}`,
    {
      method: 'PATCH',
      headers: sbHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify({ credit, updated_at: new Date().toISOString() }),
    }
  );
  if (!res.ok) throw new Error(`Supabase PATCH error ${res.status}`);
  const rows = await res.json();
  return rows[0];
}

// CORS 헤더
function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  };
}

module.exports = { getUser, createUser, setUserCredit, cors };
