import { Router } from "express";
import UserModel from "../models/userModel.js";

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const { name, email, username, password, role, company_id } = req.body;

    if (!name || !email || !username || !password || !company_id) {
      return res.status(400).json({ message: "Mandatory data is missing" });
    }

    const newAdmin = await UserModel.createAdmin({ name, email, username, password, role, company_id });

    res.status(201).json({ message: "Administrator created", admin: newAdmin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
