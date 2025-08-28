import Model from "./model.js";
import bcrypt from "bcrypt";
import { Roles } from "../utils/roles.js";

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
      `SELECT u.id, u.name, u.password, r.title as role, u.company_id, c.name as company_name
       FROM users as u
       JOIN companies c ON u.company_id = c.id
       JOIN roles r ON u.role_id = r.id
       WHERE email = ?
       LIMIT 1;`,
      [email]
    );
    return rows[0] || null;
  }

  async getWorkerByCompany(companyId) {
    const [rows] = await this.pool.execute(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role_id, 
        u.company_id, 
        c.name AS company_name
     FROM ${this.table} u
     INNER JOIN companies c ON u.company_id = c.id
     WHERE u.role_id = ? 
       AND u.company_id = ?`,
      [Roles.STAFF, companyId]
    );
    return rows;
  }



  async createUser(data) {
    data.password = await bcrypt.hash(data.password, 10);

    return await this.create(data);

  async createUser(data) {

    data.password = await bcrypt.hash(data.password, 10)

    return await this.create(data)
  }

  /**
   * BRING ALL USERS.
   * @returns {Promise<object|null>} The found user object or null if not found.
   */

  async getAllAdmins() {
    const [rows] = await this.pool.execute(
      `SELECT u.id, u.name, u.email, u.password, u.role_id, r.title as role, u.company_id, c.name as company_name
     FROM users as u
     JOIN companies c ON u.company_id = c.id
     JOIN roles r ON u.role_id = r.id
     WHERE u.role_id = ${Roles.ADMIN}`
    );
    return rows;
    
  }

}
export default new UserModel(); // export ready-to-use instance

