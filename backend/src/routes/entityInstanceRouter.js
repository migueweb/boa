import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import { Permissions } from "../utils/roles.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";
import entityInstanceService from "../services/entityInstanceService.js";
import createInstance from "../schemas/entity/entityInstanceSchema.js";


const entityinstance = Router();

entityinstance.post("/create", authorize(Permissions.ENTITY_INSTANCE.CREATE), validate(createInstance), entityInstanceService.createEntityInstance);


export default entityinstance;
