import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectToDB = async () => {
    const dbUri = process.env.DATABASE_URL;
    try {
        await mongoose.connect(dbUri);
        console.log("Connected to database")
    } catch (error) {
<<<<<<< HEAD
        console.log(error)
=======
        console.error(error)
>>>>>>> 1df65c3c58b7a93a27bb47914526a52ff8b7f283
    }
}
