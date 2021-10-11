import { IUser } from "../types/documents/user.document";
import { UserRepo } from "../repositories/user.repositories";
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse, Security } from "tsoa";
import CustomError from '../utils/error';
import { IRegisterUserReq, IDeleteUserReq } from "../types/requests/user.request";
import { IRegisterUserRes } from "../types/responses/user.response";

@Route('user')
@Tags('user')

export class UserController {

    @Post('registerUser')
    async registerUser(@Body() regReq: IRegisterUserReq): Promise<IRegisterUserRes> {
        const newUser: IUser = await new UserRepo().registerUser(regReq);
        return <IRegisterUserRes> (newUser)
    }

    @Security('api_key')
    @Delete('deleteUser')
    @SuccessResponse('200', 'User Deleted')
    async deleteUser(@Body() delReq: IDeleteUserReq) {
        return await new UserRepo().deleteUser(delReq._id)
    }

    @Security('api_key')
    @Post('checkUsers')
    async checkUsers(): Promise<IRegisterUserRes[]> {
        const users: IUser[] = await new UserRepo().checkUsers();
        return <IRegisterUserRes[]> (users)
    }

}