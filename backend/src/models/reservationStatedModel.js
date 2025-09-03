import Model from "./model.js";


/**
 * CompanyModel
 * Extends the base Model class and handles operations
 * specific to the `companies` table.
 */
class ReservationStatedModel extends Model {
  constructor() {
    // Call the parent constructor with the `users` table and primary key `id`
    super("companies", "id");
  }

}

export default new ReservationStatedModel(); // export ready-to-use instance