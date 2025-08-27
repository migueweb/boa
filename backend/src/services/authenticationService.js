import { request, response } from "express";
import userModel from "../models/userModel.js";
import permissionModel from "../models/permissionModel.js";
import bcrypt from "bcrypt";


/**
 * Service class responsible for handling user authentication logic.
 */
export default class AuthenticationService {
  /**
   * Handles user login by verifying credentials against the database.
   *
   * @async
   * @param {request} req - Express request object containing login credentials in `req.body`.
   * @param {response} res - Express response object used to send success or error responses.
   *
   * @throws Will send an error response if the email does not exist or the password does not match.
   *
   */
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      
      const user = await userModel.getByEmail(email);

      if (!user) return res.error("email not found", 401);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) return res.error("password do not match", 401);

      req.session.user = { id: user.id };

      const permissions = await permissionModel.getPermissionsByUserId(user.id);

      const userInfo = {
        name: user.name,
        company_id: user.company_id,
        company_name: user.company_name,
        role: user.role,
      }

      res.success({user:userInfo, permissions: permissions}, "Login successful");

    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * Logs out the authenticated user by destroying the session and clearing the cookie.
   *
   * @param {request} req - Express request object
   * @param {response} res - Express response object
   * @returns {void}
   */
  static logout(req, res) {

    req.session.destroy((err) => {
      if (err) {
        return res.error(500, "Logout failed");
      }

      res.clearCookie("connect.sid");
      return res.success(null,"Logout successfully");
    });
  }
}
