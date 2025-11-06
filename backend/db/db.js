import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30s
  connectionTimeoutMillis: 2000, // error after 2s if connection cannot be established
});

// Log when connected
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

// Handle idle client errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client:", err);
  process.exit(-1);
});

// Utility to query the DB easily
export const query = (text, params) => pool.query(text, params);

export default pool;
