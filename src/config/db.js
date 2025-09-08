// src/config/db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// helper para simplificar queries
export async function query(text, params) {
  const res = await db.query(text, params);
  return res;
}
