import dotenv from "dotenv"
dotenv.config()


export default {
    dbUrl: process.env.DATABASE_URL,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
}