import { MongoClient } from "mongodb"
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(url);
let dbName = "labour_db";

export const collectionName="adminlogin";

export const connection = async ()=> {
    const connect = await client.connect();
    return await connect.db(dbName)
}
