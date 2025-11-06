import express from "express";
import pool from "../db/db.js";

const router = express.Router();

/* ============================================================
    Get all addresses for a user
   ============================================================ */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      "SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching addresses:", err);
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
});

/* ============================================================
    Add a new address
   ============================================================ */
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      label,
      full_name,
      mobile_number,
      address_line_1,
      address_line_2,
      landmark,
      city,
      state,
      pincode,
      is_default,
    } = req.body;

    // Validate required fields
    if (
      !user_id ||
      !label ||
      !full_name ||
      !mobile_number ||
      !address_line_1 ||
      !address_line_2 ||
      !landmark ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure only one default per user
    if (is_default) {
      await pool.query("UPDATE addresses SET is_default = FALSE WHERE user_id = $1", [user_id]);
    }

    // Insert new address
    const result = await pool.query(
      `INSERT INTO addresses 
       (user_id, label, full_name, mobile_number, address_line_1, address_line_2, landmark, city, state, pincode, is_default)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        user_id,
        label,
        full_name,
        mobile_number,
        address_line_1,
        address_line_2,
        landmark,
        city,
        state,
        pincode,
        is_default,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding address:", err);
    res.status(500).json({ error: "Failed to add address" });
  }
});

/* ============================================================
    Update an existing address
   ============================================================ */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      label,
      full_name,
      mobile_number,
      address_line_1,
      address_line_2,
      landmark,
      city,
      state,
      pincode,
      is_default,
    } = req.body;

    // Ensure only one default per user
    if (is_default) {
      await pool.query("UPDATE addresses SET is_default = FALSE WHERE user_id = $1", [user_id]);
    }

    // Update query
    const result = await pool.query(
      `UPDATE addresses SET
        label=$1,
        full_name=$2,
        mobile_number=$3,
        address_line_1=$4,
        address_line_2=$5,
        landmark=$6,
        city=$7,
        state=$8,
        pincode=$9,
        is_default=$10,
        updated_at=NOW()
       WHERE id=$11
       RETURNING *`,
      [
        label,
        full_name,
        mobile_number,
        address_line_1,
        address_line_2,
        landmark,
        city,
        state,
        pincode,
        is_default,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating address:", err);
    res.status(500).json({ error: "Failed to update address" });
  }
});

/* ============================================================
    Delete an address
   ============================================================ */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM addresses WHERE id=$1", [id]);
    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error("Error deleting address:", err);
    res.status(500).json({ error: "Failed to delete address" });
  }
});

export default router;
