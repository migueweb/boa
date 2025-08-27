import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import AdminService from "../services/adminService.js";
import createUser from "../schemas/admin/createSchema.js";
import { Permissions } from "../utils/roles.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";




const AdminRouter = Router();

AdminRouter.post("/create", authorize(Permissions.USER.CREATE_ADMIN), validate(createUser), AdminService.create);
AdminRouter.get("/get", authorize(Permissions.USER.CREATE_ADMIN),AdminService.getAdmin);


export default AdminRouter;
