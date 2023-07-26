import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBook, IBookRes, addBookFromDB, deleteBookFromDB, getAllBookFromDB, upgradeBookFromDB } from "../api/book.api";

interface BookState {
    bookState: null | IBookRes;
    allBookState: null | IBookRes[];
    addBookState: IBook | null
    error: string | undefined;
    message: string | undefined;
}
const initialState: BookState = {
    bookState: null,
    allBookState: null,
    addBookState: null,
    error: undefined,
    message: undefined
}

export const addBook = createAsyncThunk("Book/addBook", async (book: IBook) => {
    try {
        const response: IBookRes = await addBookFromDB(book)
        return response;
    } catch (error: any) {
        throw error;
    }
})

export const getAllBooks = createAsyncThunk("Book/getAllBook", async () => {
    const response = await getAllBookFromDB()
    return response;
})

export const updateBook = createAsyncThunk("Book/upgradeBook", async ({ id, book }: { id: string, book: IBookRes }) => {
    const response = await upgradeBookFromDB(id, book);
    return response;
})
export const deleteBook = createAsyncThunk("Book/deleteBook", async (id: string) => {
    console.log(id)
    const response = await deleteBookFromDB(id);
    return response;
})
export const BookSlice = createSlice({
    name: "Book",
    initialState: initialState,
    reducers: {
        clearBookError: (state) => { state.error = undefined }
    },
    extraReducers: (builder) => {
        builder.addCase(addBook.fulfilled, (state, action) => {
            if (state.allBookState) {
                state.allBookState = [...state.allBookState, action.payload];
            }
        });
        builder.addCase(addBook.rejected, (state, action) => {
            state.bookState = null;
            state.error = action.error.message;
        });
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            state.allBookState = action.payload;
        });
        builder.addCase(updateBook.fulfilled, (state, action) => {
            const updateBook = action.payload;
            if (state.allBookState) {
                const bookIndex = state.allBookState.findIndex((book) => book._id === updateBook._id);

                if (bookIndex !== -1) {
                    state.allBookState[bookIndex] = updateBook;
                }
            }
        });
    },
})
export const { clearBookError } = BookSlice.actions;
export default BookSlice.reducer;