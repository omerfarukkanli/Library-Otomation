import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../features/userSlice";
export const store = configureStore({
    reducer: {
        userReducer: UserSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
