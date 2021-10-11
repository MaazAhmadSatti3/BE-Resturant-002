import express from 'express';
import { AdminRoutesApi } from './admin.route';
import { ResturantRoutesApi } from './resturant.route';
import { UserroutesApi } from './user.router';

export class MainRouter {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.use('/admin', AdminRoutesApi);
        this.router.use('/resturant', ResturantRoutesApi);
        this.router.use('/user', UserroutesApi);
    }
}
export const MainApi = new MainRouter().router