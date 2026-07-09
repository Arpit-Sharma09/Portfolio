import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (uri && !uri.includes("PLACEHOLDER") && uri.trim() !== "") {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production, do not use a global variable.
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export async function getDatabase(dbName?: string): Promise<Db> {
  if (!uri || uri.includes("PLACEHOLDER") || uri.trim() === "") {
    throw new Error(
      "MONGODB_URI is not configured or is set to a placeholder."
    );
  }
  if (!clientPromise) {
    throw new Error("MongoClient is not initialized.");
  }
  const mongoClient = await clientPromise;
  return mongoClient.db(dbName || process.env.MONGODB_DB || "portfolio");
}

export default clientPromise;
