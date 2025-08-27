import companiesModel from "../models/companiesModel.js";
import { request, response } from "express";
import entitieModel from "../models/entitieModel.js";


/**
 * Entity creation and response handling service.
 */
export default class EntityService {
    /**
     * Handles the creation of an entities.
     *
     * @async
     * @param {request} req - Express request object containing admin data in `req.body`.
     * @param {response} res - Express response object used to send success or error responses.
     */

    static async create(req, res) {

        const { company_id } = req.body;

        const existingCompany = await companiesModel.getById(company_id);

        if (!existingCompany) {
            res.error("The company not exists", 409);
            return;
        }

        await entitieModel.create(req.body)

        res.success("Entitie created successfully", 201);
    }
}
