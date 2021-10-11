import express from 'express';
import { ResturantController } from '../controllers/resturant.controller';
import { tokenVerify } from '../middlewares/auth.admin';
import { IRegisterResturantReq, IDeleteResturantReq, IGetResturantReq, ICheckNearbyResturantReq } from '../types/requests/resturant.request';
import { ICheckNearbyResturantRes, IRegisterResturantRes } from '../types/responses/resturant.response';

export class ResturantRoutes {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.post('/registerResturant', tokenVerify, async (req, res, next) => {
            try {
                const regRest: IRegisterResturantReq = req.body;
                const newRegRest: IRegisterResturantRes = await new ResturantController().registerResturant(regRest);
                res.status(200).send({
                    Message: newRegRest
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.delete('/deleteResturant', tokenVerify, async (req, res, next) => {
            try {
                const delReq: IDeleteResturantReq = req.body;
                const deletedRest = await new ResturantController().deleteResturant(delReq);
                res.status(200).send({
                    Message: 'Resturant Deleted'
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.post('/getResturant', async (req, res, next) => {
            try {
                const getReq: IGetResturantReq = req.body;
                const newRest: IRegisterResturantRes = await new ResturantController().getResturant(getReq);
                res.status(200).send({
                    newRest
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.post('/checkNearByResturants', async (req, res, next) => {
            try {
                const data: ICheckNearbyResturantReq = req.body
                const restList = await new ResturantController().checkNearByResturants(data);
                res.status(200).json({
                    Result: restList
                })
            } catch (error) {
                next(error)
            }
        })
    }
}
export const ResturantRoutesApi = new ResturantRoutes().router;    