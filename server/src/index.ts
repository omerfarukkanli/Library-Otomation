import express from "express";
import cors from "cors";
import route from "./routes"
import { connectToDB } from "./config/database"
import bodyParser from "body-parser";
const App = express()
App.use(cors());
App.use(bodyParser.json());
await connectToDB()
App.use(route);


App.listen(3000, () => {
    console.log('listening');
})