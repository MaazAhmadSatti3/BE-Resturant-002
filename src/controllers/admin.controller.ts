import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse } from "tsoa";
import { AdminLoginReq } from "../types/requests/admin.request";
import { AdminLoginRes } from "../types/responses/admin.response";
import jwt, { Secret } from "jsonwebtoken";
require('dotenv').config();

@Route('admin')
@Tags('admin')

export class AdminController {
    constructor() { }

    @Post('authAdmin')
    async authAdmin(@Body() admin: AdminLoginReq): Promise<AdminLoginRes> {
        return <AdminLoginRes> {
            TOKEN_KEY: jwt.sign(JSON.stringify(admin), <Secret>process.env.SECRET),
            Message: "Token Generated"
        }
    }
}

