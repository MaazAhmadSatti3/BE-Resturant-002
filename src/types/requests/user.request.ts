import { ILocation } from "../documents/resturant.document";

export interface IRegisterUserReq {
    name: string;
    email: string;
    password: string;
}

export interface IDeleteUserReq {
    _id: string;
}

