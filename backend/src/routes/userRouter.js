import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import { Permissions } from "../utils/roles.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";
import UserService from "../services/userService.js";




const userRouter = Router();

userRouter.post("/create", authorize(Permissions.USER.CREATE_STAFF),UserService.create);
userRouter.get("/get",authorize(Permissions.USER.READ),UserService.getUser);


export default userRouter;
