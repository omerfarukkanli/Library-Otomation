import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../features/userSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        userReducer: UserSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
