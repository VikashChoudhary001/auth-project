import dotenv from "dotenv";
dotenv.config(); // ✅ LOAD ENV HERE FIRST

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD), // extra safety
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

pool
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("DB connection error", err));

export default pool;
