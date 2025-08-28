import { request, response } from "express";
import companiesModel from "../models/companiesModel.js";
import customersModel from "../models/customersModel.js";

/*
 * Customers creation and response handling service.
 */
export default class CustomersService {
    /**
     * Handles the creation of customers.
     * @async
     * @param {request} req - Express request object containing admin data in `req.body`.
     * @param {response} res - Express response object used to send success or error responses.
     */

    static async create(req, res) {
        try {
            const { company_id, document } = req.body;

            const existingCompany = await companiesModel.getById(company_id);
            if (!existingCompany) {
                return res.error("The company does not exist", 409);
            }

            const documentExists = await customersModel.documentExists(document, company_id)
            if (documentExists) {
                return res.error("The document is already registered for this company", 409);
            }

            await customersModel.create(req.body);

            return res.success("Customer created successfully");

        } catch (error) {
            console.error("Error creating customer:", error);
            return res.error("Internal server error", 500);
        }
    }

}
