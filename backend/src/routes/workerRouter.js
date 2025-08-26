import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import WorkerService from "../services/workerService.js";
import createUser from "../schemas/admin/createSchema.js";


const WorkerRouter = Router()

WorkerRouter.post("/create", validate(createUser), WorkerService.create)

export default WorkerRouter