import { Document } from 'mongoose';

export interface IResturant extends Document {
    _id: string;
    name: string;
    location: ILocation;
    createdAt?: string;
    updatedAt?: string;
}

export interface ILocation {
    latitude: number;
    longitude: number;
}