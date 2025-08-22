import { Router } from "express";
import statusRouter from "./statusRouter.js";
import globalResponseHandler from "../middlewares/globalResponseHandler.js";

const router = Router();

router.use(globalResponseHandler) // global response helper

router.use("/status", statusRouter)

export default router