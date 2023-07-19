import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUser, IUserRes, addUserFromDb, loginFromDb } from "../api/user.api"

interface UserState {
    userState: IUserRes | null,
    error: string | undefined
}
const initialState: UserState = {
    userState: null,
    error: undefined
}

export const addUser = createAsyncThunk("User/addUser", async (user: IUser) => {
    try {
        const response = await addUserFromDb(user)
        return response;
    } catch (error: any) {
        throw error;
    }
})
export const loginUser = createAsyncThunk("User/Login", async (user: IUserRes) => {
    try {
        const response = await loginFromDb(user)
        return response;
    } catch (error: any) {
        throw error;
    }
})


export const UserSlice = createSlice({
    name: "User",
    initialState: initialState,
    reducers: {
        setUser: (state) => { state.userState },
        clearUser: (state) => { state.userState = null },
        clearError: (state) => { state.error = undefined },
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.userState = action.payload;
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.userState = null;
            state.error = action.error.message;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.userState = action.payload
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.userState = null;
            state.error = action.error.message
        })
    },
})
export const { setUser, clearUser, clearError } = UserSlice.actions;

export default UserSlice.reducer;