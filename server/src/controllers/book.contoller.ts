import Book, { IBook } from "../models/book.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { deleteImage, uploadImage } from "../utils/cloudinary";

export const createBook = async (req: Request, res: Response) => {
    const { title, isbn, authors, genre, image } = req.body;


    if (!title || !isbn || !authors || !genre || !image) return res.status(400).json({ message: 'Tüm alanları doldurun' });
    if (isbn.length < 9) return res.status(404).json({ message: "ISBN numarası 9 haneden fazla olmalı" })
    const book = await Book.findOne({ isbn })
    if (book) return res.status(404).json({ message: "Bu ISBN numarası kayıtlı" })

    try {
        const imageUpload = await uploadImage(image)
        console.log(imageUpload)
        const book: IBook = await Book.create({
            title: title,
            isbn: isbn,
            authors: authors,
            genre: genre,
            coverImage: imageUpload.secure_url
        })
        res.status(201).json({ book });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        console.log("geldim");
        const books = await Book.find();
        res.status(201).json({ books });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const upgradeBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, isbn, authors, genre, coverImage, }: IBook = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({ message: `Böyle bir kitap yok ${id}` })
    const updataBook = { title, isbn, authors, genre, coverImage, _id: id }
    await Book.findByIdAndUpdate(id, updataBook)
    res.status(201).json({ updataBook })
}

export const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Kitap bulunamadı' });
        }
        const publicId = getPublicIdFromImageUrl(book.coverImage);
        await deleteImage(publicId);
        await Book.findByIdAndDelete(id);
        res.status(201).json({ id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
};

function getPublicIdFromImageUrl(imageUrl) {
    const startIndex = imageUrl.lastIndexOf('/') + 1;
    const endIndex = imageUrl.lastIndexOf('.');
    return imageUrl.substring(startIndex, endIndex);
}