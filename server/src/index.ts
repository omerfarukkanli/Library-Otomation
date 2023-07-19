import express from "express";
import cors from "cors";
import route from "./routes";
import { connectToDB } from "./utils/database";
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
await connectToDB();

app.use(route);
app.listen(3000, () => {
    console.log('listening');
});
