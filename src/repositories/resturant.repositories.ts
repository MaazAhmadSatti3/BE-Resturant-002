import { ResturantSchema } from "../models/resturant.model";
import { IResturant } from "../types/documents/resturant.document";
import { IRegisterResturantReq, IDeleteResturantReq, IGetResturantReq, ICheckNearbyResturantReq } from "../types/requests/resturant.request";

export class ResturantRepo {
    constructor() {}

    registerResturant(resturant: IRegisterResturantReq) {
        return new ResturantSchema(resturant).save();
    }

    deleteResturant(_id: string) {
        return ResturantSchema.findByIdAndDelete(_id);
    }

    getResturant(_id: string) {
        return ResturantSchema.findById(_id);
    }

    checkNearByResturants() {
        return ResturantSchema.find()
    }
}