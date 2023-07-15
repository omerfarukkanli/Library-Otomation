import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../features/userSlice";
export const store = configureStore({
    reducer: {
        user: UserSlice.reducer
    }
})
export default store;
