import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import AdminService from "../services/adminService.js";
import createUser from "../schemas/admin/createSchema.js";



const createAdmin = Router();

createAdmin.post("/create",validate(createUser),AdminService.create);

export default createAdmin;
