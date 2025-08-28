import { request, response } from "express";
import userModel from "../models/userModel.js";
import customersModel from "../models/customersModel.js";
import entityInstanceModel from "../models/entityInstanceModel.js";
import reservationsModel from "../models/reservationsModel.js";
import reservationStateModel from "../models/reservationStateModel.js";

export default class ReservationService {
  /**
   * Handles the creation of a reservation.
   *
   * @async
   * @param {request} req - Express request object containing reservation data in `req.body`.
   * @param {response} res - Express response object used to send success or error responses.
   */

  static async get(req, res) {
    try {
      const { document_customer } = req.body;

      if (!document_customer) {
        return res.error("document_customer is required", 400);
      }

      const reservations =
        await reservationsModel.getReservateByCustomerDocument(
          document_customer
        );

      if (!reservations || reservations.length === 0) {
        return res.error("No reservations found for this customer", 404);
      }

      return res.json({
        message: "Workers retrieved successfully",
        reservations: reservations,
      });

    } catch (error) {
      console.error("Error fetching reservations:", error);
      return res.error("Internal server error", 500);
    }
  }

  static async create(req, res) {
    try {
      const { user_id, customer_id, entity_instance_id, reservation_state_id } =
        req.body;

      // Entities to validate before creating reservation
      const validations = [
        { model: userModel, id: user_id, error: "User does not exist" },
        {
          model: customersModel,
          id: customer_id,
          error: "Customer does not exist",
        },
        {
          model: entityInstanceModel,
          id: entity_instance_id,
          error: "Entity instance does not exist",
        },
        {
          model: reservationStateModel,
          id: reservation_state_id,
          error: "Reservation state does not exist",
        },
      ];

      // Run validations in parallel (faster than sequential awaits)
      const results = await Promise.all(
        validations.map(({ model, id }) => model.getById(id))
      );

      // Check which validation failed
      for (let i = 0; i < results.length; i++) {
        if (!results[i]) {
          return res.error(validations[i].error, 404);
        }
      }

      // Create reservation
      const createdReservation = await reservationsModel.create(req.body);

      if (!createdReservation) {
        return res.error("Error creating reservation", 500);
      }

      return res.success("Reservation created successfully", 201);
    } catch (error) {
      console.error("Error creating reservation:", error);
      return res.error("Internal server error", 500);
    }
  }
}
