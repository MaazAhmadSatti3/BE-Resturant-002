import { ILocation } from "../documents/resturant.document";

export interface IRegisterUserRes {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}
