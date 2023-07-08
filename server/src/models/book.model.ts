import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    isbn: string;
    authors: string[];
    genre: string;
    coverImage: string;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    authors: { type: [String], required: true },
    genre: { type: String, required: true },
    coverImage: { type: String, required: true },
})

export default mongoose.model<IBook>("Book", BookSchema);