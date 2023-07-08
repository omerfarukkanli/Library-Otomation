import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectToDB = async () => {
    const dbUri = process.env.DATABASE_URL;
    try {
        await mongoose.connect(dbUri);
        console.log("Connected to database")
    } catch (error) {
        console.error(error)
    }
}
