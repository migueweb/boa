import { Router } from "express"
import UsersService from "../services/userService.js"

const usersRouter = Router()

usersRouter.get("/get", UsersService.get)

export default usersRouter