import express from 'express';
import { AdminRoutesApi } from './admin.route';

export class MainRouter {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.use('/admin', AdminRoutesApi);
    }
}
export const MainApi = new MainRouter().router