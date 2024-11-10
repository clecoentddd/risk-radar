import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const testCollection = await db.collection('test').findOne();
    res.status(200).json({ message: 'Connected successfully', data: testCollection });
  } catch (error) {
    res.status(500).json({ message: 'Connection failed', error });
  } finally {
    await client.close();
  }
}
