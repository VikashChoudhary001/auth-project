import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db.js";

/* -------------------- helpers (same file) -------------------- */

const success = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const error = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};

/* -------------------- controllers -------------------- */

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return error(res, "All fields are required", 400);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, email`,
      [name, email, hashedPassword]
    );

    return success(
      res,
      "User registered successfully",
      result.rows[0],
      201
    );

  } catch (err) {
    if (err.code === "23505") {
      return error(res, "Email already exists", 409);
    }

    console.error("REGISTER ERROR:", err);
    return error(res, "Server error", 500);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return error(res, "Email and password are required", 400);
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return error(res, "Invalid email or password", 401);
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return error(res, "Invalid email or password", 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return success(res, "Login successful", {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return error(res, "Server error", 500);
  }
};
