import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
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

async function findMongoRecordById(id) {
  if (!collection) throw new Error("Mongo not initialized");

  return await collection.findOne({ _id: new ObjectId(id) });
}

async function findMongoRecordOne() {
  if (!collection) throw new Error("Mongo not initialized");

  return await collection.findOne();
}


async function findMongoRecordByShowId(id) {
  if (!collection) throw new Error("Mongo not initialized");

  return await collection.findOne({ show: new ObjectId(id) });
}

async function deleteMongoRecords() {
  if (!collection) throw new Error("Mongo not initialized");

  await collection.deleteMany({});
}

async function updateMongoRecordToEmptyArray(id, arrayFieldName) {
  if (!collection) throw new Error("Mongo not initialized");

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { [arrayFieldName]: [] } } // Dynamically set the field to empty array
  );
}

export { 
  MongoConnect, 
  findMongoRecord,
  findMongoRecordOne,
  findMongoRecordById,
  findMongoRecordByShowId,
  deleteMongoRecords,
  updateMongoRecordToEmptyArray 
};