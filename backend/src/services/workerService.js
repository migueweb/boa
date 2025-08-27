import companiesModel from "../models/companiesModel.js";
import UserModel from "../models/userModel.js";
import { request, response } from "express";
import { Roles } from "../utils/roles.js";
import userModel from "../models/userModel.js";

/**
 * Service class responsible for handling user workers.
 */
export default class WorkerServices {
  /**
   * Handles user creation by validating company and checking if the user already exists.
   *
   * @async
   * @param {request} req - Express request object containing form in `req.body`.
   * @param {response} res - Express response object used to send success or error responses.
   *
   */

  static async get(req, res) {
    try {
      const { company_id } = req.body;

      const company = await companiesModel.getById(company_id);

      if (!company) {
        return res.error("Company does not exist", 404);
      }

      const workers = await userModel.getWorkerByCompany(company_id);

      return res.json({
        message: "Workers retrieved successfully",
        data: workers,
      });
    } catch (error) {
      console.error("Error getting workers:", error);
      return res.error("Internal server error", 500);
    }
  }

  static async create(req, res) {
    try {
      console.log(req.body);

      const { email, company_id } = req.body;

      const existingUser = await UserModel.getByEmail(email);
      const company = await companiesModel.getById(company_id);

      if (!company) {
        return res.error("Company does not exist", 404);
      }

      if (existingUser) {
        return res.error("User already exists", 409);
      }

      // Clone the request body and overwrite role_id
      const userData = {
        ...req.body,
        role_id: Roles.STAFF, // worker role
      };

      console.log(userData);

      await UserModel.createUser(userData);

      // ✅ Confirm creation
      const createdUser = await UserModel.getByEmail(email);
      if (!createdUser) {
        return res.error("Error creating worker", 500);
      }

      return res.success("Worker created successfully", 201);
    } catch (err) {
      console.error(err);
      return res.error("Internal server error", 500);
    }
  }
}
