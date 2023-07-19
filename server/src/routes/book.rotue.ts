import express from "express";
import { getAllBooks, getBookById, deleteBook, upgradeBook, createBook } from '../controllers/book.contoller'
const router = express.Router();

router.post("/books/create", createBook);
router.get("/books", getAllBooks)
router.get("/books:id", getBookById)
router.delete("/books/id", deleteBook)
router.put("/books/:id", upgradeBook)


export default router