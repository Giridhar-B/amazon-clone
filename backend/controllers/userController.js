import pool from "../db/db.js"; 

// Update user details
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile_number } = req.body;

  try {
    // Update user in DB
    const result = await pool.query(
      `UPDATE users
       SET name = $1, email = $2, mobile_number = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, mobile_number`,
      [name, email, mobile_number, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

