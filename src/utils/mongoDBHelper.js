import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let client;
let collection;

async function MongoConnect(databaseName, collectionName) {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
  }

  const db = client.db(databaseName);
  collection = db.collection(collectionName);
}

async function findMongoRecord(email) {
  if (!collection) throw new Error("Mongo not initialized");

  return await collection.findOne({ email });
}

async function findMongoRecords() {
  if (!collection) throw new Error("Mongo not initialized");

  return await collection.find({}).toArray();;
}

async function findMongoRecordsById(params,value) {
  if (!collection) throw new Error("Mongo not initialized");

  return await collection.find({[params]:value}).toArray();;
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

async function deleteMongoRecordsById(params,id) {
  if (!collection) throw new Error("Mongo not initialized");

  await collection.deleteMany({[params]:new ObjectId(id)});
}

async function deleteOne(params,value) {
  if (!collection) throw new Error("Mongo not initialized");

  await collection.deleteOne({[params]:value});
}

async function deleteMany(params,value) {
  if (!collection) throw new Error("Mongo not initialized");

  await collection.deleteMany({[params]:value});
}

async function updateMongoRecordToEmptyArray(id, arrayFieldName) {
  if (!collection) throw new Error("Mongo not initialized");

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { [arrayFieldName]: [] } } // Dynamically set the field to empty array
  );
}

async function updateOne(id,fieldName,value) {
  if(!collection) throw new Error('Mongo not initialized');

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {$set:{[fieldName]:value}}
  );
}

export { 
  MongoConnect, 
  findMongoRecord,
  findMongoRecords,
  findMongoRecordOne,
  findMongoRecordById,
  findMongoRecordByShowId,
  findMongoRecordsById,
  deleteMongoRecords,
  updateMongoRecordToEmptyArray ,
  updateOne,
  deleteOne,
  deleteMany,
  deleteMongoRecordsById
};