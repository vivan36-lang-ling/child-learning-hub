let count = 0;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'POST') {
    count++;
  }
  res.status(200).json({ value: count });
}
