import { request, response } from "express";
import entitieModel from "../models/entitieModel.js";
import entityInstanceModel from "../models/entityInstanceModel.js";
import companiesModel from "../models/companiesModel.js";

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

  static async getEntitiesInstance(req, res) {
    try {
      const { company_id } = req.query;

      const existingCompany = await companiesModel.getById(company_id);
      if (!existingCompany) {
        return res.error("The company does not exist", 404);
      }

      const entityInstances = await entityInstanceModel.getEntitiesInstanceByCompany(company_id);
      
        return res.success({
        message: "entity instance retrieved successfully",
        data: entityInstances,
      });
    } catch (error) {
      console.error("Error get entity:", error);
      return res.error("Internal server error", 500);
    }
  }

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
