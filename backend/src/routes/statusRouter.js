import { Router } from "express"
import StatusService from "../services/statusService.js"

const statusRouter = Router()

statusRouter.get("/", StatusService.get)

export default statusRouter