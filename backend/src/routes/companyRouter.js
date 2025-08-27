import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import companyService from "../services/companyService.js";
import createCompany from "../schemas/company/createCompanySchema.js";
import { Permissions } from "../utils/roles.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";


const companyRouter = Router();

companyRouter.post("/create",authorize(Permissions.COMPANY.CREATE ),validate(createCompany),companyService.createCompany);

export default companyRouter;
