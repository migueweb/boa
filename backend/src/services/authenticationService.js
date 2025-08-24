import { request, response } from "express";
import userModel from "../models/userModel.js";
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

    const user = await userModel.getByEmail(email);

    if (!user) {
      res.error("email not found", 401);
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.error("password do not match", 401);
      return;
    }

    req.session.user = {
      id: user.id,
      email: user.email
    };

    const userInfo = {
      id: user.id,
      name: user.name,
      company_id: user.company_id,
      company_name: user.company_name,
    }

    res.success({user:userInfo}, "Login successful");
  }
}
