import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../features/userSlice";

import { BookSlice } from "../features/bookSlice";

export const store = configureStore({
    reducer: {
        userReducer: UserSlice.reducer,
        bookReducer: BookSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
