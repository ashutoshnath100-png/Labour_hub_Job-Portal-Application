// import { MongoClient } from "mongodb"
// import dotenv from "dotenv";

// dotenv.config();
// const url = process.env.MONGO_URI || "mongodb://localhost:27017";
// const client = new MongoClient(url);
// let dbName = "labour_db";

// export const collectionName="adminlogin";

// export const connection = async ()=> {
//     const connect = await client.connect();
//     return await connect.db(dbName)
// }


import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export const collectionName = "adminlogin";

let db;

export const connection = async () => {
  try {
    if (!db) {
      const connectedClient = await client.connect();
      db = connectedClient.db("labour_hub");
      console.log("✅ MongoDB Atlas Connected");
    }
    return db;
  } catch (error) {
    console.log("❌ DB Connection Error:", error.message);
    throw error;
  }
};