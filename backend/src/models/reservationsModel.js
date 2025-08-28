import Model from "./model.js";

/**
 * CompanyModel
 * Extends the base Model class and handles operations
 * specific to the `companies` table.
 */
class ReservationModel extends Model {
  constructor() {
    // Call the parent constructor with the `users` table and primary key `id`
    super("reservations", "id");
  }

  /**
   * Get reservations by customer document.
   *
   * @param {string} document_customer - The customer's document number.
   * @returns {Promise<Array>} List of reservations with user, customer, entity and state details.
   */
  async getReservateByCustomerDocument(document_customer) {
    const query = `
      SELECT 
        u.name AS user_name,
        c.name AS customer_name,
        c.document,
        c.email,
        c.phone,
        ei.name AS entity_instance_name,
        rs.title AS reservation_status,
        r.star_datetime,
        r.end_datetime,
        r.created_at,
        r.updated_at
      FROM reservations r
      JOIN users u ON r.user_id = u.id 
      JOIN customers c ON r.customer_id = c.id  
      JOIN entity_instances ei ON r.entity_instance_id = ei.id
      JOIN reservation_states rs ON r.reservation_state_id = rs.id
      WHERE c.document = ?;
    `;

    return await this.pool.query(query, [document_customer]);
  }
}



export default new ReservationModel(); // export ready-to-use instance
