import { Router } from "express";
import statusRouter from "./statusRouter.js";
import AuthenticationRouter from "./authenticationRouter.js";
import WorkerRouter from "./workerRouter.js";
import AdminRouter from "./adminRouter.js";
import companyRouter from "./companyRouter.js";

const router = Router();

router.use("/status", statusRouter)
router.use("/auth", AuthenticationRouter)
router.use("/admin", AdminRouter)
router.use("/worker", WorkerRouter)
router.use("/company", companyRouter)


export default router