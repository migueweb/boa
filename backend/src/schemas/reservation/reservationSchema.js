import { z } from "zod";

/**
 * Schema to validate reservation creation payload.
 * Ensures IDs are integers, datetime fields are valid,
 * and that the reservation end time is after the start time.
 */
const createReservation = z
  .object({
    // The ID of the user making the reservation (must be an integer)
    user_id: z.number().int(),

    // The ID of the customer related to the reservation (must be an integer)
    customer_id: z.number().int(),

    // The ID of the entity instance reserved (must be an integer)
    entity_instance_id: z.number().int(),

    // The current state of the reservation (must be an integer, e.g., pending, confirmed)
    reservation_state_id: z.number().int(),

    // Reservation start datetime
    star_datetime: z.coerce.date({
      required_error: "star_datetime is required",
      invalid_type_error: "star_datetime must be a valid datetime",
    }),

    // Reservation end datetime
    end_datetime: z.coerce.date({
      required_error: "end_datetime is required",
      invalid_type_error: "end_datetime must be a valid datetime",
    }),
  })
  // Custom validation to ensure end_datetime is not before start_datetime
  .refine((data) => data.end_datetime >= data.star_datetime, {
    message: "end_datetime must be greater than or equal to star_datetime",
    path: ["end_datetime"],
  });
export default createReservation;
