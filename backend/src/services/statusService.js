import { request, response } from "express";

export default class StatusService {
  /**
   * @param {request} req - Express request
   * @param {response} res - Express response
   */
  static get(req, res) {
    return res.success(null, "API working");
  }
}