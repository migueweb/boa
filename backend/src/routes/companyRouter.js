import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import companyService from "../services/companyService.js";
import createCompany from "../schemas/company/createCompanySchema.js";


const companyRouter = Router();

companyRouter.post("/create",validate(createCompany),companyService.createCompany);

export default companyRouter;
