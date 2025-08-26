import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import AdminService from "../services/adminService.js";
import createUser from "../schemas/admin/createSchema.js";



const companyRouter = Router();

companyRouter.post("/create",validate(createUser),AdminService.create);

export default companyRouter;
