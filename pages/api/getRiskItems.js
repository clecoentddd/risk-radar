// Import MongoClient from the MongoDB library
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure this is set in Replit's environment variables

export default async function handler(req, res) {
  // Handle GET requests to retrieve data from MongoDB
  if (req.method === 'GET') {
    const client = new MongoClient(uri);

    try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Access the "radar" database and "enterprise" collection
      const db = client.db('radar');
      const collection = db.collection('enterprise');

      // Fetch all documents in the "enterprise" collection
      const items = await collection.find({}).toArray();

      // Respond with the retrieved items
      res.status(200).json(items);
    } catch (error) {
      // Respond with an error message if the connection or query fails
      res.status(500).json({ error: 'Error fetching items from MongoDB', details: error.message });
    } finally {
      // Close the MongoDB connection
      await client.close();
    }
  } else {
    // Respond with a 405 status if the request method is not GET
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
