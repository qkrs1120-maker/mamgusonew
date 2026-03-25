const { getUser, cors } = require('./_supabase');

export default async function handler(req, res) {
  const headers = cors(req.headers.origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const uid = req.query.uid;
    if (!uid || uid.length < 10) {
      return res.status(400).json({ error: 'Invalid uid' });
    }

    const user = await getUser(uid);
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({ uid, credit: user.credit });
  } catch (err) {
    console.error('[get-credit]', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
