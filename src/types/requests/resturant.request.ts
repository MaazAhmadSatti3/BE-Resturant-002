import { ILocation } from "../documents/resturant.document";

export interface IRegisterResturantReq {
    name: string;
    location: ILocation;
}

export interface IDeleteResturantReq {
    _id: string;
}

export interface IGetResturantReq {
    _id: string;
}

export interface ICheckNearbyResturantReq {
    location: ILocation;
    radius: number;
}