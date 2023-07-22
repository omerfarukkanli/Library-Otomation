import { IBookRes } from "../api/book.api";

export type RootStackParamList = {
    Home: { id: number } | undefined;
    Login: { id: number } | undefined;
    Register: { id: number } | undefined;
    Bookdetail: { book:IBookRes } | undefined;
    Profile: { id: number } | undefined;
};
