let count = 0;
let loaded = false;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    if (!loaded) {
      try {
        const fs = require('fs');
        const p = '/tmp/count.txt';
        if (fs.existsSync(p)) {
          count = parseInt(fs.readFileSync(p, 'utf8')) || 0;
        }
        loaded = true;
      } catch {}
    }
    if (req.method === 'POST') {
      count++;
      try {
        require('fs').writeFileSync('/tmp/count.txt', String(count));
      } catch {}
    }
    res.status(200).json({ value: count });
  } catch {
    res.status(200).json({ value: '—' });
  }
}
