import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBook, addBookFromDB } from "../api/book.api";

interface BookState {
    bookState: IBook | null;
    error: string | undefined;
}
const initialState: BookState = {
    bookState: null,
    error: undefined
}

export const addBook = createAsyncThunk("User/addUser", async (book: IBook) => {
    try {
        const response = await addBookFromDB(book)
        return response;
    } catch (error: any) {
        throw error;
    }
})



export const BookSlice = createSlice({
    name: "Book",
    initialState: initialState,
    reducers: {
        setBook: (state) => { state.bookState },
        clearBook: (state) => { state.bookState = null },
        clearErrorBook: (state) => { state.error = undefined },
    },
    extraReducers: (builder) => {
        builder.addCase(addBook.fulfilled, (state, action) => {
            state.bookState = action.payload;
        });
        builder.addCase(addBook.rejected, (state, action) => {
            state.bookState = null;
            state.error = action.error.message;
        });
    },
})
export const { setBook, clearBook, clearErrorBook } = BookSlice.actions;

export default BookSlice.reducer;