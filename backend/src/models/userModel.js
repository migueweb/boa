import Model from "./model.js";

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


  
  //create admin, validation the email exist
  async createAdmin({ name, email, username, password, role = "Admin", company_id }) {
    
    const existingUser = await this.getByEmail(email);
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //insert user
    const [result] = await this.pool.execute(
      `INSERT INTO users (name, email, username, password, role, company_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [name, email, username, hashedPassword, role, company_id]
    )
  }
}
export default new UserModel(); // export ready-to-use instance

