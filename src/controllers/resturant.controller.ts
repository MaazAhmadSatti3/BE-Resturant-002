import { IResturant } from "../types/documents/resturant.document";
import { ResturantRepo } from "../repositories/resturant.repositories";
import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Put,
  Delete,
  SuccessResponse,
  Security,
} from "tsoa";
import CustomError from "../utils/error";
import {
  IRegisterResturantReq,
  IDeleteResturantReq,
  IGetResturantReq,
  ICheckNearbyResturantReq,
} from "../types/requests/resturant.request";
import {
  ICheckNearbyResturantRes,
  IRegisterResturantRes,
} from "../types/responses/resturant.response";
const geolib = require("geolib");
@Route("resturant")
@Tags("resturant")
export class ResturantController {
  @Security("api_key")
  @Post("registerResturant")
  async registerResturant(
    @Body() regReq: IRegisterResturantReq
  ): Promise<IRegisterResturantRes> {
    const newResturant: IResturant =
      await new ResturantRepo().registerResturant(<IResturant>regReq);
    return <IRegisterResturantRes>newResturant;
  }

  @Security("api_key")
  @Delete("deleteResturant")
  @SuccessResponse("200", "Resturant Deleted")
  async deleteResturant(@Body() delReq: IDeleteResturantReq) {
     await new ResturantRepo().deleteResturant(delReq._id);
  }

  @Post("getResturant")
  async getResturant(
    @Body() getReq: IGetResturantReq
  ): Promise<IRegisterResturantRes> {
    const newResturant: IResturant = <any>(
      await new ResturantRepo().getResturant(getReq._id)
    );
    if (newResturant === null)
      throw new CustomError(404, "Resturant not found");
    return <IRegisterResturantRes>newResturant;
  }

  /**
     * 
     *   I have register 10 resturants in rawalipindi and tested this with 10,000 meter radius it returns all but if you let say
         input lat and long of anywhere outside rawalpindi i.e radius > 10,000 it will return empty array
     * @returns 
     */
  @Post("checkNearByResturants")
  async checkNearByResturants(
    @Body() location: ICheckNearbyResturantReq
  ): Promise<ICheckNearbyResturantRes[]> {
    const resturants: IResturant[] =
      await new ResturantRepo().checkNearByResturants();
    // Array for near resturants
    let nearResturants: any[] = [];
    /**
     * I have register 10 resturants in rawalipindi and tested this with 10,000 meter radius it returns all but if you let say
     * input lat and long of anywhere outside rawalpindi i.e radius > 10,000 it will return empty array
     */
    resturants.map((resturant) => {
      const distance = geolib.getDistance(
        {
          latitude: resturant.location.latitude,
          longitude: resturant.location.longitude,
        },
        {
          latitude: location.location.latitude,
          longitude: location.location.longitude,
        }
      );
      if (distance < location.radius) {
        const nearResturant = {
          name: resturant.name,
          distance: distance,
          location: {
            latitude: resturant.location.latitude,
            longitude: resturant.location.longitude,
          },
        };
        nearResturants.push(nearResturant);
      }
    });
    return <ICheckNearbyResturantRes[]>nearResturants;
  }
}
