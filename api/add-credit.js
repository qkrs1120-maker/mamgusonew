const { getUser, setUserCredit, cors, SUPABASE_URL, SUPABASE_KEY } = require('./_supabase');

const MAX_CREDIT = 9999;
const SHARE_COOLDOWN_MS = 60 * 60 * 1000;

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

export default async function handler(req, res) {
  const headers = cors(req.headers.origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { uid, amount, reason } = req.body || {};

    if (!uid || typeof uid !== 'string') {
      return res.status(400).json({ error: 'Invalid uid' });
    }
    if (!amount || typeof amount !== 'number' || amount <= 0 || amount > 100) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const user = await getUser(uid);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (reason === 'share') {
      const lastShare = await getLastShare(uid);
      if (lastShare) {
        const elapsed = Date.now() - new Date(lastShare).getTime();
        if (elapsed < SHARE_COOLDOWN_MS) {
          const remaining = Math.ceil((SHARE_COOLDOWN_MS - elapsed) / 60000);
          return res.status(429).json({
            error: 'Cooldown active',
            message: `${remaining}분 후에 다시 공유 보상을 받을 수 있어요!`,
            credit: user.credit,
          });
        }
      }
      await updateLastShare(uid);
    }

    const newCredit = Math.min(MAX_CREDIT, user.credit + amount);
    await setUserCredit(uid, newCredit);

    return res.status(200).json({ uid, credit: newCredit, added: amount });
  } catch (err) {
    console.error('[add-credit]', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
