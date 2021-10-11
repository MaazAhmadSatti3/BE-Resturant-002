import { Schema, model } from "mongoose";
import { IUser } from "../types/documents/user.document";

const IUserSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
    },
    { timestamps: true }
)
export const UserSchema = model<IUser>('IUserSchema', IUserSchema);