import express from 'express';
import { UserController } from '../controllers/user.controller';
import { tokenVerify } from '../middlewares/auth.admin';
import { IRegisterUserReq, IDeleteUserReq } from '../types/requests/user.request';
import { IRegisterUserRes } from '../types/responses/user.response';

export class UserRoutes {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.post('/registerUser', async (req, res, next) => {
            try {
                const regUser: IRegisterUserReq = req.body;
                const newUser: IRegisterUserRes = await new UserController().registerUser(regUser);
                res.status(200).send({
                    Message: newUser
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.delete('/deleteUser', tokenVerify, async (req, res, next) => {
            try {
                const delReq: IDeleteUserReq =req.body;
                const deletedUser = await new UserController().deleteUser(delReq);
                res.status(200).send({
                    Message: 'User Deleted'
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.post('/checkUsers', tokenVerify, async (req, res, next) => {
            try {
                const usersList: IRegisterUserRes[] = await new UserController().checkUsers();
                res.status(200).json({
                    Result: usersList
                })
            } catch (error) {
                next(error)
            }
        })
    }
} 
export const UserroutesApi = new UserRoutes().router;