import companiesModel from "../models/companiesModel.js";
import UserModel from "../models/userModel.js";
import { request, response } from "express";
import { Roles } from "../utils/roles.js";

/**
 * Service class responsible for managing the logic of creation.
 */
export default class AdminService {
  /**
   * Handles the creation of an admin, validating data and assigning default role.
   *
   * @async
   * @param {request} req - Express request object containing admin data in `req.body`.
   * @param {response} res - Express response object used to send success or error responses.
   */

  static async create(req, res) {
    try {
      const { email, company_id } = req.body;


      const company = await companiesModel.getById(company_id);
      if (!company) {
        res.error("The company does not exist", 404);
        return;
      }

      const existingUser = await UserModel.getByEmail(email);
      if (existingUser) {
        res.error("User already exists", 409);
        return;
      }

      req.body.role_id = Roles.ADMIN;

      await UserModel.createUser(req.body);

      const createdUser = await UserModel.getByEmail(email);
      if (!createdUser) {
        res.error("Error creating admin", 500);
        return;
      }

      res.success("Admin created successfully", 201);

    } catch (error) {
      console.error("AdminService.create error:", error);
      res.error("Internal server error", 500);
    }
  }

  /**
     * HANDLES THE SEARCH FOR ADMINS IN THE USERS TABLE.
     *
     * @async
     * @param {response} res - Express response object used to send success or error responses.
     */

  static async getAdmin(req, res) {
    try {
      const admins = await UserModel.getAllAdmins();

      if (!admins.length) {
        res.error("No admins found", 404);
        return;
      }

      const adminInfo = admins.map((admin) => ({
        role_id: admin.role_id,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        company_id: admin.company_id,
        company_name: admin.company_name,
      }));

      res.success({ admins: adminInfo });

    } catch (error) {
      console.error("AdminService  error:", error);
      // console.error(error.stack);
      res.error("Internal server error", 500);
    }
  }

}
