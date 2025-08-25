import { Router } from "express";
import statusRouter from "./statusRouter.js";
import AuthenticationRouter from "./authenticationRouter.js";

const router = Router();

router.use("/status", statusRouter)
router.use("/auth", AuthenticationRouter)

export default router