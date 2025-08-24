import mysql from "mysql2/promise";
import dotenv from "dotenv"

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  database: process.env.MYSQL_DB_NAME,
  port: process.env.MYSQL_DB_PORT,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

export default pool;