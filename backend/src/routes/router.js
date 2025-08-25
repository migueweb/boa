import { Router } from "express";
import statusRouter from "./statusRouter.js";
import AuthenticationRouter from "./authenticationRouter.js";
import adminRouter from "./adminRouter.js";

const router = Router();

router.use("/status", statusRouter)
router.use("/auth", AuthenticationRouter)
router.use("/admin",adminRouter)

export default router