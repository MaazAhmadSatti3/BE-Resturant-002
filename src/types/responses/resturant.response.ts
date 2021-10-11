import { ILocation } from "../documents/resturant.document";

export interface IRegisterResturantRes {
    _id: string;
    name: string;
    location: ILocation;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICheckNearbyResturantRes {
    name: string;
    distance: number;
    location: ILocation;
}