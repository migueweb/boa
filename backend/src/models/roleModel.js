import Model from "./model.js";


/**
 * RoleModel
 * Extends the base Model class and handles operations
 * specific to the `roles` table.
 */
class RoleModel extends Model {
  constructor() {
    // Call the parent constructor with the `users` table and primary key `id`
    super("roles", "id");
  }

}

export default new RoleModel(); // export ready-to-use instance