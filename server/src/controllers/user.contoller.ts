import User, { IUser } from "../models/user.model"
import { Request, Response } from "express"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, lastname, password, email }: { name: string, lastname: string, password: string, email: string } = req.body;
        const userClone: IUser = await User.findOne({ email })

        if (!name || !lastname || !password || !email) return res.status(400).json({ message: 'Tüm alanları doldurun' });
        if (userClone) return res.status(400).json({ message: 'Böyle bir kullanıcı kayıtlı' })
        if (!isValidEmail(email)) return res.status(400).json({ message: 'Geçersiz email formatı' })
        if (password.length < 8) return res.status(400).json({ message: 'Şifre en az 8 karakter olmalıdır' })

        const username: string = `${name} ${lastname} `
        const user: IUser = new User({ username, password, email });
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        if (!password || !email) return res.status(400).json({ message: 'Tüm alanları doldurun' });

        const user: IUser = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Böyle bir kullanıcı bulunamadı' });
        if (user.password !== password) return res.status(400).json({ message: 'Şifre Yanlış' });

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

function isValidEmail(email: string): boolean {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}