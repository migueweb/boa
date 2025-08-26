import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import WorkerService from "../services/workerService.js";
import createUser from "../schemas/admin/createSchema.js";
import { Permissions } from "../utils/roles.js"; 
import { authorize } from "../middlewares/AuthorizationMiddleware.js";


const WorkerRouter = Router()

WorkerRouter.post("/create", authorize(Permissions.USER.CREATE_STAFF), validate(createUser), WorkerService.create
);

export default WorkerRouter