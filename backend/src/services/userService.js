import UserModel from "../models/userModel.js";
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

  static async create(req, res) {
    try {
      const { email, company_id } = req.body;


      const company = await userModel.getById(company_id);
      if (!company) {
        res.error("The company does not exist", 404);
        return;
      }

      const existingUser = await UserModel.getByEmail(email);
      if (existingUser) {
        res.error("User already exists", 409);
        return;
      }

      await UserModel.createUser(req.body);

      const createdUser = await UserModel.getByEmail(email);
      if (!createdUser) {
        res.error("Error creating user", 500);
        return;
      }

      res.success("user created successfully", 201);

    } catch (error) {
      console.error("usercreate.create error:", error);
      res.error("Internal server error", 500);
    }
  }

  /**
     * HANDLES THE SEARCH FOR ADMINS IN THE USERS TABLE.
     *
     * @async
     * @param {response} res - Express response object used to send success or error responses.
     */

  static async getUser(req, res) {
    try {
      const user = await UserModel.getAll();

      if (!user.length) {
        res.error("No admins found", 404);
        return;
      }

      const userInfo = user.map((user) => ({
        role_id: user.role_id,
        name: user.name,
        email: user.email,
        password: user.password,
        company_id: user.company_id,

      }));

      res.success({ admins: userInfo });

    } catch (error) {
      console.error("AdminService  error:", error);
      // console.error(error.stack);
      res.error("Internal server error", 500);

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
