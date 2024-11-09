import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'items.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Read the existing items from the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading the items file' });
      }

      const items = JSON.parse(data);
      const newItem = req.body;

      // Add the new item to the items array
      items.push(newItem);

      // Write the updated items back to the file
      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error saving the item' });
        }
        res.status(200).json({ message: 'Item saved successfully' });
      });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
