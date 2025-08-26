import companiesModel from "../models/companiesModel.js";
import { request, response } from "express";

/**
 * Service class responsible for managing the logic of admin creation.
 */
export default class companyService {
    /**
     * Handles the creation of an admin, validating data and assigning default role.
     *
     * @async
     * @param {request} req - Express request object containing admin data in `req.body`.
     * @param {response} res - Express response object used to send success or error responses.
     */

    static async createCompany(req, res) {
        const { nit } = req.body;

        const existingCompany = await companiesModel.getByColumn('nit', nit);
        
        if (existingCompany) {
            res.error("The company with this NIT already exists", 409);
            return;
        }

        await companiesModel.create(req.body);

        res.success("Company created successfully", 201);
    }

}
