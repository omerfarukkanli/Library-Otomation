import axios, { AxiosResponse } from "axios"
import { baseUrl } from "./book.api";

export interface IUser {
    name: string;
    lastname: string;
    password: string;
    email: string;
    authority?: boolean;
}
export interface IUserRes {
    username?: string,
    email?: string;
    password?: string;
    authority?: boolean;
}
export const addUserFromDb = async (user: IUser): Promise<IUser | any> => {
    try {
        const response = await axios.post(`${baseUrl}/register`, user)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error("Could not add user. Network error occurred.");
        }
    }
}
export const loginFromDb = async (user: IUserRes): Promise<IUser | any> => {
    try {
        const response = await axios.post(`${baseUrl}/login`, user)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error("Could not add user. Network error occurred.");
        }
    }
}

