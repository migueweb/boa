import { Router } from "express"
import AuthenticationService from "../services/authenticationService.js"
import { validate } from "../middlewares/ValidationMiddleware.js"
import loginSchema from "../schemas/auth/loginSchema.js"


const AuthenticationRouter = Router()

AuthenticationRouter.post("/login", validate(loginSchema), AuthenticationService.login)

export default AuthenticationRouter