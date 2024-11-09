import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'items.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Incoming request body:', req.body);  // Log incoming item data

    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading the items file' });
      }

      const items = JSON.parse(data);
      const newItem = req.body;

      console.log('Current items:', items);  // Log current items in the file

      // Add the new item to the items array
      items.push(newItem);

      // Write the updated items back to the file
      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error saving the item' });
        }
        console.log('Updated items:', items);  // Log the updated list of items
        res.status(200).json({ message: 'Item saved successfully', item: newItem });
      });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
