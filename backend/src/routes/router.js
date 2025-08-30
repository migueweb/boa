import { Router } from "express";
import statusRouter from "./statusRouter.js";
import AuthenticationRouter from "./authenticationRouter.js";
import WorkerRouter from "./workerRouter.js";
import AdminRouter from "./adminRouter.js";
import companyRouter from "./companyRouter.js";
import entitiesRouter from "./entitiesRouter.js";
import entityinstance from "./entityInstanceRouter.js";
import customersRouter from "./customersRouter.js";
import reservationsRouter from "./reservationRouter.js";
import rolesRouter from "./rolesRouter.js";

const router = Router();

router.use("/status", statusRouter)
router.use("/auth", AuthenticationRouter)
router.use("/admin", AdminRouter)
router.use("/worker", WorkerRouter)
router.use("/company", companyRouter)
router.use("/entitie", entitiesRouter)
router.use("/entityinstance", entityinstance)
router.use("/customers", customersRouter)
router.use("/reservations",reservationsRouter)
router.use("/role",rolesRouter)
export default router