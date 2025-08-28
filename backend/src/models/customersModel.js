import Model from "./model.js";

/**
 * CustomersModel
 * Extends the base Model class and handles operations
 * specific to the `customers` table.
 */
class CustomersModel extends Model {

    constructor() {
        // Call the parent constructor with the `customers` table and primary key `id`
        super("customers", "id");
    }

    /**
     * Checks if a customer with the given document exists associated with a specific company.
     * 
     * @param {string} documentNumber 
     * @param {number|string} companyId 
     * @returns {Promise<boolean>} 
     */

    async documentExists(document, companyId) {
        const query = `
        SELECT 1 FROM ${this.table}
        WHERE document = ? AND company_id = ?
        LIMIT 1
    `;
        const [rows] = await this.pool.execute(query, [document, companyId]);
        return rows.length > 0;
    }
     /**
     * We search for clients by filtering your company.
     * @param {number|string} companyId 
     * @returns {Promise<boolean>} 
     */
    async getCustomer(companyId) {
        const query = `
        SELECT cu.id, cu.name, cu.phone, cu.email, cu.document
        FROM ${this.table} AS cu
        WHERE cu.company_id = ? `;
        const [rows] = await this.pool.execute(query, [companyId]);
        return rows;
    }

}

export default new CustomersModel(); 