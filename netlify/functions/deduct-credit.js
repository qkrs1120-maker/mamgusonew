/**
 * POST /api/deduct-credit
 * Body: { uid: string, amount: number }
 *
 * - DB에서 현재 크레딧 확인
 * - 잔액 부족하면 402 반환
 * - 잔액 충분하면 차감 후 저장
 */
const { getUser, setUserCredit, cors } = require('./_supabase');

exports.handler = async (event) => {
  const headers = cors(event.headers.origin);

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { uid, amount } = JSON.parse(event.body || '{}');

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

    if (user.credit < amount) {
      return {
        statusCode: 402,
        headers,
        body: JSON.stringify({ error: 'Insufficient credits', credit: user.credit }),
      };
    }

    const newCredit = user.credit - amount;
    await setUserCredit(uid, newCredit);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ uid, credit: newCredit, deducted: amount }),
    };
  } catch (err) {
    console.error('[deduct-credit]', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
