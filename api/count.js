export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return res.status(200).json({ value: '—' });
  }
  const path = 'visitor_count';
  const url = 'https://blob.vercel-storage.com/' + path;
  try {
    if (req.method === 'POST') {
      let current = 0;
      try {
        const r = await fetch(url, {
          headers: { Authorization: 'Bearer ' + token }
        });
        if (r.ok) {
          const d = await r.json();
          current = d.value || 0;
        }
      } catch {}
      current++;
      const r = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          'x-vercel-blob-cache-control': 'public, max-age=0'
        },
        body: JSON.stringify({ value: current })
      });
      if (r.ok) return res.status(200).json({ value: current });
      return res.status(200).json({ value: 'write-fail-' + r.status });
    }
    const r = await fetch(url, {
      headers: { Authorization: 'Bearer ' + token }
    });
    if (r.ok) {
      const d = await r.json();
      return res.status(200).json({ value: d.value || 0 });
    }
    return res.status(200).json({ value: 0 });
  } catch (e) {
    return res.status(200).json({ value: 'err-' + e.message });
  }
}
