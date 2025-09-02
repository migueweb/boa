import { Router } from "express";
import { Permissions } from "../utils/roles.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";
import ReservationService from "../services/reservationService.js";
import ReservationStateService from "../services/reservationStateService.js";


const reservationsStateRouter = Router();

reservationsStateRouter.get("/get" , authorize(Permissions.RESERVATION.READ), ReservationStateService.get)

export default reservationsStateRouter;
