export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const kv = process.env.KV_REST_API_URL;
    if (!kv) {
      let c = 0;
      if (req.method === 'POST') {
        c = parseInt(process.env.CURRENT_COUNT || '0') + 1;
      }
      return res.status(200).json({ value: c || 1 });
    }
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    let current;
    if (req.method === 'POST') {
      const r = await fetch(url + '/incr/visitor_count', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token }
      });
      const d = await r.json();
      current = d.result;
    } else {
      const r = await fetch(url + '/get/visitor_count', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token }
      });
      const d = await r.json();
      current = d.result || 0;
    }
    res.status(200).json({ value: current });
  } catch {
    res.status(200).json({ value: '—' });
  }
}
