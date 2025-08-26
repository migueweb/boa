import { da } from "zod/v4/locales";
import Model from "./model.js";
import bcrypt from "bcrypt";

/**
 * UserModel
 * Extends the base Model class and handles operations
 * specific to the `users` table.
 */
class UserModel extends Model {
  constructor() {
    // Call the parent constructor with the `users` table and primary key `id`
    super("users", "id");
  }

  /**
   * Find a user by email.
   * @param {string} email - The user's email.
   * @returns {Promise<object|null>} The found user object or null if not found.
   */
  async getByEmail(email) {
    const [rows] = await this.pool.execute(
      `SELECT u.id, u.name, u.password, u.company_id, c.name as company_name
       FROM users as u
       JOIN companies c ON u.company_id = c.id
       WHERE email = ?
       LIMIT 1`,
      [email]
    );
    return rows[0] || null;
  }


  async createUser(data) {
    
    data.password = await bcrypt.hash(data.password, 10)

    return await this.create(data)

  }
}
export default new UserModel(); // export ready-to-use instance

