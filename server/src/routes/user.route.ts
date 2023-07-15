import { loginUser, registerUser } from "../controllers/user.contoller"
import express from "express"
const router = express.Router();

router.post('/login', loginUser)
router.post('/register', registerUser)

export default router;