import companiesModel from "../models/companiesModel.js";
import UserModel from "../models/userModel.js";
import { request, response } from "express";

/**
 * Service class responsible for handling user authentication logic.
 */
export default class AdminService {
    /**
     * Handles user login by verifying credentials against the database.
     *
     * @async
     * @param {request} req - Express request object containing form in `req.body`.
     * @param {response} res - Express response object used to send success or error responses.
     *
     * @throws Will send an error response if the email does not exist or the password does not match.
     *
     */

    static async create(req, res) {
        const { email, company_id, role_id } = req.body;
        const newAdmin = await UserModel.getByEmail(email);
        const companies = await companiesModel.getById(company_id)

        if (!companies) {
            res.error("no existe la company")
            return
        }

        if (newAdmin) {
            res.error("user exist ");
            return
        }

        await UserModel.createUser(req.body)
        res.success("user created");

    }
}