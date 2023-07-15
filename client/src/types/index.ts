import { IUser } from "../api/user.api";

export type RootStackParamList = {
    Home: { id: number } | undefined;
    Login: { id: number } | undefined;
    Register: { id: number } | undefined;
    Bookdetail: { id: number } | undefined;
    Profile: { id: number } | undefined;

};
