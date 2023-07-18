import mongoose from "mongoose";
import config from "../config"

export const connectToDB = async () => {
    const dbUri = config.dbUrl;
    try {
        await mongoose.connect(dbUri);
        console.log("Connected to database")
    }
    catch (err) { console.log(err.message) }
}
