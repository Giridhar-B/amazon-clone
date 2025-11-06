import express from "express";
import pool, { query as dbQuery } from "../db/db.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// JWT config
const JWT_SECRET = process.env.JWT_SECRET || "myjwtsecretkey123";
const JWT_EXPIRES_IN = "7d";

/**
 * POST /api/auth/check-user
 * Body: { identifier: email or mobile_number }
 * Returns: whether user exists (Step 1 of login)
 */
router.post("/check-user", async (req, res) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ error: "Email or mobile number required" });
  }

  try {
    const queryText = `
      SELECT id, name, email
      FROM users
      WHERE email = $1 OR mobile_number = $1
      LIMIT 1
    `;
    const result = await dbQuery(queryText, [identifier]);

    if (result.rowCount === 0) {
      return res.status(404).json({ exists: false, message: "User not found" });
    }

    res.json({ exists: true, user: result.rows[0] });
  } catch (err) {
    console.error("Check-user error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * POST /api/auth/login
 * Body: { identifier: email or mobile_number, password: string }
 * Returns: JWT token + user info (Step 2 of login)
 */
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: "Email/Mobile and password required." });
    }

    const queryText = `
      SELECT id, name, email, mobile_number, password
      FROM users
      WHERE email = $1 OR mobile_number = $1
      LIMIT 1
    `;
    const result = await dbQuery(queryText, [identifier]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found. Please register." });
    }

    const user = result.rows[0];

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // JWT token
    const payload = { userId: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile_number: user.mobile_number,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

export default router;
