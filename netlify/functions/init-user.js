/**
 * POST /api/init-user
 * Body: { uid: string }
 *
 * - uid가 DB에 없으면 → 100 크레딧 지급 후 저장
 * - uid가 DB에 있으면 → DB에 저장된 크레딧 반환
 * - uid가 없으면 → 400
 */
const { getUser, createUser, cors } = require('./_supabase');

exports.handler = async (event) => {
  const headers = cors(event.headers.origin);

  // preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { uid } = JSON.parse(event.body || '{}');
    if (!uid || typeof uid !== 'string' || uid.length < 10 || uid.length > 64) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid uid' }) };
    }

    // UID 존재 여부 확인
    const existing = await getUser(uid);

    if (existing) {
      // 기존 유저 → DB 크레딧 그대로 반환
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ uid, credit: existing.credit, isNew: false }),
      };
    }

    // 신규 유저 → 100 크레딧 지급
    const newUser = await createUser(uid);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ uid, credit: newUser?.credit ?? 100, isNew: true }),
    };
  } catch (err) {
    console.error('[init-user]', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error', message: err.message }),
    };
  }
};
