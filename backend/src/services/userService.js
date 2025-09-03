import { request, response } from "express";
import userModel from "../models/userModel.js";

export default class UsersService {
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

  static async create(req, res) {
    try {
      console.log("Received data:", req.body);

      const { email } = req.body;


      const existingUser = await userModel.getByEmail(email);
      if (existingUser) {
        return res.error("User already exists", 409);
      }


      console.log("Creating user...");
      await userModel.createUser(req.body);


      const createdUser = await userModel.getByEmail(email);
      if (!createdUser) {
        return res.error("Error creating user", 500);
      }

      console.log("User created successfully");
      return res.success({
        message: "User created successfully",
        data: createdUser
      }, 201);

    } catch (error) {
      console.error("UsersService.create error:", error);
      return res.error("Internal server error", 500);
    }
  }
}