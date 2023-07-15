import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    isbn: string;
    authors: string[];
    genre: string;
    coverImage: string;
}

const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    authors: { type: [String], required: true },
    genre: { type: String, required: true },
    coverImage: { type: String, required: true },
});

export default mongoose.model<IBook>('Book', bookSchema);