import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import route from "./routes"
import { connectToDB } from "./config/database"

const App = express()

App.use(cors());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));

connectToDB()
App.use(route);


