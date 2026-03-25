/**
 * POST /api/add-credit
 * Body: { uid: string, amount: number, reason: string }
 *
 * - 공유 보상(+10) 등 크레딧 추가
 * - reason: 'share' | 'event' | 'admin'
 * - share: 1시간 쿨다운 체크 (DB의 last_share_at 컬럼 사용)
 */
const { getUser, setUserCredit, cors } = require('./_supabase');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAX_CREDIT   = 9999;
const SHARE_COOLDOWN_MS = 60 * 60 * 1000; // 1시간

async function getLastShare(uid) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/users?uid=eq.${encodeURIComponent(uid)}&select=last_share_at`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  const rows = await res.json();
  return rows[0]?.last_share_at || null;
}

async function updateLastShare(uid) {
  await fetch(
    `${SUPABASE_URL}/rest/v1/users?uid=eq.${encodeURIComponent(uid)}`,
    {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ last_share_at: new Date().toISOString() }),
    }
  );
}

exports.handler = async (event) => {
  const headers = cors(event.headers.origin);

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { uid, amount, reason } = JSON.parse(event.body || '{}');

    if (!uid || typeof uid !== 'string') {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid uid' }) };
    }
    if (!amount || typeof amount !== 'number' || amount <= 0 || amount > 100) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid amount' }) };
    }

    const user = await getUser(uid);
    if (!user) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: 'User not found' }) };
    }

    // 공유 쿨다운 체크
    if (reason === 'share') {
      const lastShare = await getLastShare(uid);
      if (lastShare) {
        const elapsed = Date.now() - new Date(lastShare).getTime();
        if (elapsed < SHARE_COOLDOWN_MS) {
          const remaining = Math.ceil((SHARE_COOLDOWN_MS - elapsed) / 60000);
          return {
            statusCode: 429,
            headers,
            body: JSON.stringify({
              error: 'Cooldown active',
              message: `${remaining}분 후에 다시 공유 보상을 받을 수 있어요.`,
              credit: user.credit,
            }),
          };
        }
      }
      await updateLastShare(uid);
    }

    const newCredit = Math.min(MAX_CREDIT, user.credit + amount);
    await setUserCredit(uid, newCredit);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ uid, credit: newCredit, added: amount }),
    };
  } catch (err) {
    console.error('[add-credit]', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
