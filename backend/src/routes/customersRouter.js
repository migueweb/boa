import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";
import { Permissions } from "../utils/roles.js";
import CustomersService from "../services/customersService.js";
import createCustomer from "../schemas/customer/customerSchema.js";

const customersRouter = Router();

customersRouter.post("/create", authorize(Permissions.CUSTOMER.CREATE),validate(createCustomer), CustomersService.create);

export default customersRouter;