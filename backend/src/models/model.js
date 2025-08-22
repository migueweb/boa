import pool from "../utils/pool.js";

/**
 * Base class for database models.
 * Provides access to the shared MySQL connection pool.
 */
class Model {
  /**
   * Creates a new Model instance.
   *
   * @constructor
   * @property {Pool} pool - MySQL connection pool instance
   */
  constructor() {
    /**
     * MySQL connection pool available to child models.
     * Use this to execute queries.
     * @type {import("mysql2/promise").Pool}
     */
    this.pool = pool;
  }
}

export default Model;