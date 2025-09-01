
import { request, response } from "express";
import userModel from "../models/userModel.js";

/**
 * Service class responsible for managing the logic of company creation.
 */
export default class UsersService {
  /**
   * Handles the creation of an users.
   *
   * @async
   * @param {request} req - Express request object containing admin data in `req.body`.
   * @param {response} res - Express response object used to send success or error responses.
   */

  static async get(req, res) {
    try {
      const users = await userModel.getAll();

      return res.success({
        message: "users retrieved successfully",
        data: users,
      });
      
    } catch (error) {
      console.error("Error getting users:", error);
      return res.error("Internal server error", 500);
    }
  }

}
