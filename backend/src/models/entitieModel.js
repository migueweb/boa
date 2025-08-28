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


    /**
     * We search for entity by filtering your company.
     * @param {number|string} companyId 
     * @returns {Promise<boolean>} 
     */

    async getEntities(companyId) {
        const query = `
        SELECT e.id, e.company_id, e.plural_name, e.single_name 
        FROM ${this.table} AS e
        WHERE e.company_id = ? `;
        const [rows] = await this.pool.execute(query, [companyId]);
        return rows;
    }
}

export default new EntitiesModel(); // export ready-to-use instance