import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;  // Get connection string from environment variables
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      await client.connect();

      const database = client.db('radar'); // Use the 'radar' database (or whatever you chose)
      const collection = database.collection('enterprise'); // 'items' is the collection where items will be saved

      // Insert the new item into the collection
      const newItem = req.body;
      const result = await collection.insertOne(newItem);

      res.status(200).json({ message: 'Item saved successfully', item: newItem });
    } catch (error) {
      console.error('Error saving item:', error);
      res.status(500).json({ error: 'Error saving the item' });
    } finally {
      await client.close();  // Always close the connection after use
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
