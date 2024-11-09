import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'items.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading the items file' });
      }

      const items = JSON.parse(data);
      res.status(200).json(items);
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
