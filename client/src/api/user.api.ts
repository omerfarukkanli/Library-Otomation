import axios from "axios";
import { api } from ".";
export interface IUser {
    name: string;
    lastname: string;
    password: string;
    email: string;
    authority?: boolean;
}
export const addUserFromDb = async (user: IUser): Promise<IUser> => {
    console.log(user)
    try {
        const response = await axios.post("http://localhost:3000/register", user);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}