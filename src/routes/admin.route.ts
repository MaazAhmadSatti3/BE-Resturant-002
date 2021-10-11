import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { AdminLoginReq } from '../types/request/admin.request';
import { AdminLoginRes } from '../types/response/admin.response';

export class AdminRoutes {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.post('/authAdmin', async (req, res, next) => {
            try {
                const admin: AdminLoginReq = req.body;
                const newAdmin: AdminLoginRes = await new AdminController().authAdmin(admin);
                res.status(200).json({
                TOKEN_KEY: newAdmin.TOKEN_KEY,
                Message: newAdmin.message
            })
            } catch (error) {
                next(error);
            }
        })
    }
}
export const AdminRoutesApi = new AdminRoutes().router