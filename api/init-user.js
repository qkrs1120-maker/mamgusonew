const { getUser, createUser, cors } = require('./_supabase');

export default async function handler(req, res) {
  const headers = cors(req.headers.origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { uid } = req.body || {};
    if (!uid || typeof uid !== 'string' || uid.length < 10 || uid.length > 64) {
      return res.status(400).json({ error: 'Invalid uid' });
    }

    const existing = await getUser(uid);
    if (existing) {
      return res.status(200).json({ uid, credit: existing.credit, isNew: false });
    }

    const newUser = await createUser(uid);
    return res.status(200).json({ uid, credit: newUser?.credit ?? 100, isNew: true });
  } catch (err) {
    console.error('[init-user]', err);
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
}
