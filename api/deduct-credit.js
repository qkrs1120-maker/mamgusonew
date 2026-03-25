const { getUser, setUserCredit, cors } = require('./_supabase');

export default async function handler(req, res) {
  const headers = cors(req.headers.origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { uid, amount } = req.body || {};

    if (!uid || typeof uid !== 'string') {
      return res.status(400).json({ error: 'Invalid uid' });
    }
    if (!amount || typeof amount !== 'number' || amount <= 0 || amount > 100) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const user = await getUser(uid);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.credit < amount) {
      return res.status(402).json({ error: 'Insufficient credits', credit: user.credit });
    }

    const newCredit = user.credit - amount;
    await setUserCredit(uid, newCredit);

    return res.status(200).json({ uid, credit: newCredit, deducted: amount });
  } catch (err) {
    console.error('[deduct-credit]', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
