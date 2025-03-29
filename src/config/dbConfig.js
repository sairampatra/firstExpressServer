import dotenv  from 'dotenv';
import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";
dotenv.config()
export const connectToDb = async () => {
   try {
    await mongoose.connect(DB_URL)
    console.log("YAAAA")
   } catch (error) {
    console.log("Error connecting to DB" , error)
   }
}