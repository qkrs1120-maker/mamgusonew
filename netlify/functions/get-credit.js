/**
 * GET /api/get-credit?uid=XXX
 * 현재 크레딧 조회 (페이지 로드 시 동기화용)
 */
const { getUser, cors } = require('./_supabase');

exports.handler = async (event) => {
  const headers = cors(event.headers.origin);

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const uid = event.queryStringParameters?.uid;
    if (!uid || uid.length < 10) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid uid' }) };
    }

    const user = await getUser(uid);
    if (!user) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: 'User not found' }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ uid, credit: user.credit }),
    };
  } catch (err) {
    console.error('[get-credit]', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
