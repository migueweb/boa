import companiesModel from "../models/companiesModel.js";
import UserModel from "../models/userModel.js";
import { request, response } from "express";

/**
 * service class responsible for managing the logic of admin creation.
 */
export default class AdminService {
    /**
     * Manages the creation of admin, validating that the data types are correct.
     *
     * @async
     * @param {request} req - Express object containing the user data to be inserted form in `req.body`.
     * @param {response} res - Express response object used to send success or error responses.
     *
     */

    static async create(req, res) {
        const { email, company_id } = req.body;
        const newAdmin = await UserModel.getByEmail(email);
        const companies = await companiesModel.getById(company_id)

        if (!companies) {
            res.error("the company does not exist")
            return
        }

        if (newAdmin) {
            res.error("user exist ");
            return
        }

        req.body.role_id = 2;

        await UserModel.createUser(req.body)

        // confirm exists in db
        const createdUser = await UserModel.getByEmail(email);
        if (!createdUser) {
            res.error("error creating admin");
            return;
        }

        res.success(`Admin created`);

    }
}