import express from "express";
import cors from "cors";
import route from "./routes"
import { connectToDB } from "./config/database"
const App = express()
App.use(cors());
connectToDB()
App.use(route);


