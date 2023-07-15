import { PayloadAction, createAsyncThunk, createSlice ,Draft} from "@reduxjs/toolkit"
import { IUser, addUserFromDb } from "../api/user.api"

interface UserState {
    userState: IUser | null,
}
const initialState: UserState = {
    userState: null,
}
export const addUser = createAsyncThunk("User/addUser", async (user: IUser) => {
    console.log(user)
    const response = await addUserFromDb(user);
    return response;
})


export const UserSlice = createSlice({
    name: "User",
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        clearUser: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.userState = action.payload;
        })
    }
})

export const { setUser, clearUser } = UserSlice.actions;
