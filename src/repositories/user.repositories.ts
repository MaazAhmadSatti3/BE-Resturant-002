import { UserSchema } from "../models/user.model";
import { IUser } from "../types/documents/user.document";
import { IRegisterUserReq } from "../types/requests/user.request";

export class UserRepo {
    constructor() {}

    registerUser(user: IRegisterUserReq) {
        return new UserSchema(user).save();
    }

    deleteUser(_id: string) {
        return UserSchema.findByIdAndDelete(_id);
    }

    checkUsers() {
        return UserSchema.find();
    }
}