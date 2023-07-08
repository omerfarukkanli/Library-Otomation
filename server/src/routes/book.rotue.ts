import express from "express";
import { getAllBooks, getBookById, getBookNameOrAuthor, deleteBook, upgradeBook } from '../controllers/book.contoller'

const router = express.Router();

router.get("/books", getAllBooks)
router.get("/books:id", getBookById)
router.get("/books/seach", getBookNameOrAuthor)
router.get("/books/delete", deleteBook)
router.get("/books/upgrade:id", upgradeBook)


export default router