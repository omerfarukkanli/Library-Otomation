import axios from "axios"
export interface IBook {
    title: string;
    isbn: string;
    authors: string[];
    genre: string;
    image: string;
}
export interface IBookRes {
    _id: string;
    title: string;
    isbn: string;
    authors: string[];
    genre: string;
    coverImage: string;
}
export const addBookFromDB = async (book: IBook): Promise<IBook | any> => {
    try {
        const response = await axios.post("http://10.0.2.2:3000/books/create", book,)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error("Could not add user. Network error occurred.");
        }
    }
}

export const getAllBookFromDB = async () => {
    try {
        const response = await axios.get("http://10.0.2.2:3000/books")
        const books: IBookRes[] = response.data.books;
        return books
    } catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error("Could not add user. Network error occurred.");
        }
    }

}
