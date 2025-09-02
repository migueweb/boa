import { Router } from "express"
import UsersService from "../services/userService.js"
import { Permissions } from "../utils/roles.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";

const usersRouter = Router()
usersRouter.post("/create", authorize(Permissions.USER.CREATE_STAFF),UsersService.create);
usersRouter.get("/get", UsersService.get)

export default usersRouter