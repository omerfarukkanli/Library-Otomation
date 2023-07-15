import BookRouter from "./book.rotue"
import UserRouter from "./user.route"
import express from "express"
const router = express.Router()

router.use(BookRouter)
router.use(UserRouter)

export default router