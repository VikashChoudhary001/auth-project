// db.js
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

console.log("DB HOST:", process.env.DB_HOST);
console.log("DB USER:", process.env.DB_USER);
console.log("DB NAME:", process.env.DB_NAME);
console.log("DB DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB DB_PORT:", process.env.DB_PORT);

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      }
);

export default pool;
