import { request, response } from "express";
import entitieModel from "../models/entitieModel.js";
import entityInstanceModel from "../models/entityInstanceModel.js";

/**
 * Service class responsible for managing the logic of entity Instance creation.
 */
export default class entityInstanceService {
    /**
     * Handles the creation of an entity instance, validating data and entity_id.
     *
     * @async
     * @param {request} req - Express request object containing admin data in `req.body`.
     * @param {response} res - Express response object used to send success or error responses.
     */

    static async createEntityInstance(req, res) {
        try {

            const { entity_id } = req.body;

            const existingEntity = await entitieModel.getById(entity_id);
            if (!existingEntity) {
                return res.error("The entity with this id does not exist", 409);
            }

            const createdInstance = await entityInstanceModel.create(req.body);

            if (!createdInstance) {
                return res.error("Error creating entity instance", 500);
            }

            return res.success("Entity instance created successfully", 201);

        } catch (error) {
            console.error("Error creating entity instance:", error);
            return res.error("Internal server error", 500);
        }
    }

}
