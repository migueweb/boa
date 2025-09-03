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

     async getEntitiesInstanceByCompany(companyId) {
  const query = `
    SELECT 
        e.id,
        e.plural_name,
        e.single_name,
        ei.name AS entity_instance_name,
        ei.created_at
    FROM entities AS e
    INNER JOIN entity_instances AS ei 
        ON ei.entity_id = e.id
    WHERE e.company_id = ?;
  `;

  const [rows] = await this.pool.execute(query, [companyId]);
  return rows;
}
}

export default new EntityInstanceModel(); // export ready-to-use instance