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


    /**
         * manages the service of listing entities depending on your company.
         * @async
         * @param {request} req - Express request object containing admin data in `req.body`.
         * @param {response} res - Express response object used to send success or error responses.
         * @param {company_id }- company ID
         */

    static async getEntities(req, res) {
        try {
            const { company_id } = req.body;

            const existingCompany = await companiesModel.getById(company_id);
            if (!existingCompany) {
                return res.error("The company does not exist", 404);
            }

            const customers = await entitieModel.getEntities(company_id);
            return res.success(customers);

        } catch (error) {
            console.error("Error get customers:", error);
            return res.error("Internal server error", 500);
        }
    }
}
