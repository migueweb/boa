import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import { Permissions } from "../utils/roles.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";
import entityInstanceService from "../services/entityInstanceService.js";
import createReservation from "../schemas/reservation/reservationSchema.js";
import ReservationService from "../services/reservationService.js";


const reservationsRouter = Router();

reservationsRouter.post("/create", authorize(Permissions.RESERVATION.CREATE), validate(createReservation),ReservationService.create)
reservationsRouter.get("/get" , authorize(Permissions.RESERVATION.READ), ReservationService.get)

export default reservationsRouter;
