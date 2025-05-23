import "dotenv/config";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

async function connectTestDB() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}

async function closeTestDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}

async function clearTestDB() {
  const collections = mongoose.connection.collections;
  for (let key in collections) {
    await collections[key].deleteMany({});
  }
}

export { connectTestDB, closeTestDB, clearTestDB };
