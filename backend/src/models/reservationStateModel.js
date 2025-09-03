import Model from "./model.js";

/**
 * ReservationStateModel
 * Extends the base Model class and handles operations
 * specific to the `ReservationState` table.
 */
class ReservationStateModel extends Model {
  constructor() {
    // Call the parent constructor with the `ReservationState` table and primary key `id`
    super("reservation_states", "id");
  }
}

export default new ReservationStateModel(); // export ready-to-use instance
