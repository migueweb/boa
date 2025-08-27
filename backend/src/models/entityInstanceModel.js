import Model from "./model.js";

/**
 * EntityInstanceModel
 * Extends the base Model class and handles operations
 * specific to the `entity_instances` table.
 */
class EntityInstanceModel extends Model {
    constructor() {
        // Call the parent constructor with the `entity_instances` table and primary key `id`
        super("entity_instances", "id");
    }
}

export default new EntityInstanceModel(); // export ready-to-use instance