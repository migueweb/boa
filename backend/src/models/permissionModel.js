import Model from "./model.js";


class PermissionModel extends Model {
  constructor() {
    super("permissions", "id")
  }

  /**
   * Retrieves all permissions assigned to a given user
   *
   * @async
   * @param {number} userId - The ID of the user whose permissions are being retrieved.
   * @returns {Promise<string[]>} A promise that resolves to an array of permission names.
   *
   * @example
   * const permissions = await permissionModel.getPermissionsByUserId(5);
   * console.log(permissions); // ["user_create", "user_read", ...]
   */
  async getPermissionsByUserId(userId) {
    const [rows] = await this.pool.query(
      `SELECT p.name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      JOIN role_has_permissions rp ON r.id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = ?`,
      [userId]
    );

    return rows.map(r => r.name);
  }
}

export default new PermissionModel();