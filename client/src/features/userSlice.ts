import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUser, addUserFromDb } from "../api/user.api"

interface UserState {
    user: IUser | null,
}
const initialState: UserState = {
    user: null,
}
export const addUser = createAsyncThunk("User/addUser", async (user: IUser) => {
    console.log(user)
    const response = await addUserFromDb(user);
    return response;
})


export const UserSlice = createSlice({
    name: "User",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
})


