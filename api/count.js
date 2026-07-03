import { put, get } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const path = 'visitor_count.json';
  try {
    if (req.method === 'POST') {
      let current = 0;
      try {
        const existing = await get(path);
        if (existing) {
          const d = await existing.json();
          current = d.value || 0;
        }
      } catch {}
      current++;
      await put(path, JSON.stringify({ value: current }), { contentType: 'application/json' });
      return res.status(200).json({ value: current });
    }
    try {
      const existing = await get(path);
      if (existing) {
        const d = await existing.json();
        return res.status(200).json({ value: d.value || 0 });
      }
    } catch {}
    return res.status(200).json({ value: 0 });
  } catch {
    return res.status(200).json({ value: '—' });
  }
}
