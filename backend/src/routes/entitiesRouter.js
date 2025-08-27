import { Router } from "express";
import { validate } from "../middlewares/ValidationMiddleware.js";
import EntityService from "../services/entitiesService.js";
import createEntity from "../schemas/entity/entitySchema.js";
import { authorize } from "../middlewares/AuthorizationMiddleware.js";
import { Permissions } from "../utils/roles.js";

const entityRouter = Router();

entityRouter.post("/create",authorize(Permissions.ENTITY.CREATE), validate(createEntity),EntityService.create);

export default entityRouter;
