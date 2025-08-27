import Model from "./model.js";

/**
 * EntitiesModel
 * Extends the base Model class and handles operations
 * specific to the `entities` table.
 */
class EntitiesModel extends Model {
    constructor() {
        // Call the parent constructor with the `entities` table and primary key `id`
        super("entities", "id");
    }
}

export default new EntitiesModel(); // export ready-to-use instance