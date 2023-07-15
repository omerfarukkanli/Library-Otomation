import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    authority: boolean;
}

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, unique: true },
    authority: { type: Boolean, default: false },

})

export default mongoose.model<IUser>("User", UserSchema)