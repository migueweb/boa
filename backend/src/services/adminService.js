import companiesModel from "../models/companiesModel.js";
import UserModel from "../models/userModel.js";
import { request, response } from "express";

/**
 * Service class responsible for managing the logic of admin creation.
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

      req.body.role_id = 2;

      await UserModel.createUser(req.body);

      const createdUser = await UserModel.getByEmail(email);
      if (!createdUser) {
        res.error("Error creating admin", 500);
        return;
      }

      res.success( "Admin created successfully", 201);

    } catch (error) {
      console.error("AdminService.create error:", error);
      res.error("Internal server error", 500);
    }
  }
}
