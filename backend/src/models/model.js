import pool from "../utils/pool.js";

/**
 * Base class for database models.
 * Provides access to the shared MySQL connection pool and
 * common properties like table name and primary key.
 */
class Model {
  /**
   * Creates a new Model instance.
   *
   * @constructor
   * @param {string} table - The database table name associated with the model.
   * @param {string} [primaryKey="id"] - The primary key column of the table.
   *
   * @property {import("mysql2/promise").Pool} pool - MySQL connection pool instance.
   * @property {string} table - Name of the database table.
   * @property {string} primaryKey - Name of the table’s primary key column.
   */
  constructor(table, primaryKey = "id") {
    /**
     * MySQL connection pool available to child models.
     * Use this to execute queries.
     * @type {import("mysql2/promise").Pool}
     */
    this.pool = pool;

    /**
     * Database table name associated with the model.
     * @type {string}
     */
    this.table = table;

    /**
     * Primary key column of the associated table.
     * @type {string}
     * @default "id"
     */
    this.primaryKey = primaryKey;
  }

  /**Obtener todos los registros */
  async getAll() {
    const [rows] = await this.pool.query(`SELECT * FROM ${this.table}`);
     return rows; 
  }

  /**Obtener registro por id*/
  async getById(id) {
    const [rows] = await this.pool.query(`SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null
  }

  /**Crear registro */
  async create(data) {
    const [result] = await this.pool.query(`INSERT INTO ${this.table} SET ?`, [data]);
    return { id: result.insertId, ...data }; // return the id insert into table 
  }

  /** actualizar un registro */
  async update(id, data) {
    await this.pool.query(
      `UPDATE ${this.table} SET ? WHERE ${this.primaryKey} = ?`,
      [data, id]
    );
    return this.getById(id);
  }

  /** eliminar un registro */
  async delete(id) {
    const [result] = await this.pool.query(
      `DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }

  /** Obtener un registro por una columna específica */
  async getByColumn(column, value) {
    const [rows] = await this.pool.query(
      `SELECT * FROM \`${this.table}\` WHERE \`${column}\` = ? LIMIT 1`,
      [value]
    );
    return rows[0] || null;
  }


}

export default Model;
