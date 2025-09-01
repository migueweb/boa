
import { request, response } from "express";
import userModel from "../models/userModel.js";
import reservationStateModel from "../models/reservationStateModel.js";

/**
 * Service class responsible for managing the logic of company creation.
 */
export default class ReservationStateService {
  /**
   * Handles the creation of an reservation.
   *
   * @async
   * @param {request} req - Express request object containing admin data in `req.body`.
   * @param {response} res - Express response object used to send success or error responses.
   */

  static async get(req, res) {
    try {
      const reservation_states = await reservationStateModel.getAll();

      return res.success({
        message: "reservatiosnStated successfully",
        data: reservation_states,
      });
      
    } catch (error) {
      console.error("Error getting users:", error);
      return res.error("Internal server error", 500);
    }
  }

}
