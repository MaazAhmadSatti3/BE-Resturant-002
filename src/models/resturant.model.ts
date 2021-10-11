import { Schema, model } from "mongoose";
import { IResturant } from "../types/documents/resturant.document";

const IResturantSchema = new Schema(
    {
        name: { type: String },
        location: {
            longitude: { type: Number },
            latitude: { type: Number },
        },
    },
    { timestamps: true }
)
export const ResturantSchema = model<IResturant>('IResturantSchema', IResturantSchema);