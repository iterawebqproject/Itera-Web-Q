import { type Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'ai_quality';

let client: MongoClient | null = null;
let db: Db | null = null;
let connecting: Promise<void> | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  if (!uri) throw new Error('Missing MONGODB_URI');

  if (!connecting) {
    connecting = (async () => {
      client = new MongoClient(uri);
      await client.connect();
      db = client!.db(dbName);
      await db
        .collection('runs')
        .createIndexes([
          { key: { createdAt: -1 } },
          { key: { userId: 1, createdAt: -1 } },
          { key: { branch: 1 } },
        ]);
    })();
  }
  await connecting;
  return db!;
}
