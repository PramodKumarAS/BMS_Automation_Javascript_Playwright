import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let client;
let collection;

async function MongoConnect(databaseName, collectionName) {
  if (!client) {
    client = new MongoClient(process.env.Mongo_Url);
    await client.connect();
  }

  const db = client.db(databaseName);
  collection = db.collection(collectionName);
}

async function findMongoRecord(email) {
  if (!collection) throw new Error("Mongo not initialized");

  
  return await collection.findOne({ email });
}

async function findMongoRecord() {
  if (!collection) throw new Error("Mongo not initialized");

  
  return await collection.findOne();
}


export { MongoConnect, findMongoRecord };