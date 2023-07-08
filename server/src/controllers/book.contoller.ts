import Book, { IBook } from "../models/book.model";
import multer from "multer";
import { Request, Response } from "express";
import mongoose from "mongoose";

const upload = multer({ dest: 'uploads/' });


export const createBook = (upload.single('coverImage'), async (req: Request, res: Response) => {

    const { title, isbn, authors, genre } = req.body;
    const coverImage = req.path

    const book: IBook = new Book({
        title,
        isbn,
        authors,
        genre,
        coverImage,
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export const getAllBooks = async (res: Response) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getBookById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id)
        if (book) res.status(200).json(book);
        else res.status(404).json({ message: "Böyle bir kitap bulunamadı" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getBookNameOrAuthor = async (req: Request, res: Response) => {
    try {
        const { title, author, isbn } = req.query;
        let query: any = {};
        if (title) query.title = { $regex: title.toString(), $options: 'i' };
        if (author) query.authors = { $regex: author.toString(), $options: 'i' };
        if (isbn) query.authors = { $regex: isbn.toString(), $options: 'i' };
        const books = await Book.find(query);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const upgradeBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, isbn, authors, genre, coverImage, }: IBook = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({ message: `there is no such product ${id}` })
    const updataBook = { title, isbn, authors, genre, coverImage, _id: id }
    await Book.findByIdAndUpdate(id, updataBook)
    res.json(updataBook)
}

export const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({ message: `there is no such product ${id}` })
    await Book.findByIdAndRemove(id)
}

