import { Request, Response } from "express";

export default class StatusService {
  /**
   * @param {Request} req - Express request
   * @param {Response} res - Express response
   */
  static get(req, res) {
    return res.success(null, "API working");
  }
}