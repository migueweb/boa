import { Router } from "express";
import RoleService from "../services/roleService.js";


const rolesRouter = Router();


rolesRouter.get("/get",RoleService.getRole);


export default rolesRouter;
