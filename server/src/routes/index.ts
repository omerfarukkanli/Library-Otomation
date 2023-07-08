import BookRouter from "./book.rotue"
import express from "express"
const router = express.Router()

router.use(BookRouter)

export default router