import express from "express";
import pool from "../db/db.js";

const router = express.Router();

/* -----------------------------------------------
    GET all cart items for a user
   Includes product title, price, and first image
------------------------------------------------ */
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await pool.query(
      `SELECT 
         c.id AS cart_item_id,
         c.user_id,
         c.product_id,
         c.quantity,
         p.title,
         p.price,
         p.asin,
         (SELECT pm.media_url
          FROM product_media pm
          WHERE pm.product_id = p.id AND pm.thumbnail_order = 1
          LIMIT 1) AS image_url
       FROM cart_items c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1
       ORDER BY c.id DESC`,
      [userId]
    );

    res.json(cartItems.rows);
  } catch (err) {
    console.error(" Error fetching cart:", err.message);
    res.status(500).json({ error: "Server error fetching cart" });
  }
});

/* -----------------------------------------------
    POST Add item to cart
   Accepts either product_id or asin (auto-resolves)
------------------------------------------------ */
router.post("/", async (req, res) => {
  try {
    let { user_id, product_id, asin, quantity } = req.body;

    if (!product_id && asin) {
      const productResult = await pool.query(
        `SELECT id FROM products WHERE asin = $1`,
        [asin]
      );
      if (productResult.rows.length === 0) {
        return res.status(400).json({ error: "Invalid ASIN, product not found" });
      }
      product_id = productResult.rows[0].id;
    }

    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if item already exists
    const existing = await pool.query(
      `SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2`,
      [user_id, product_id]
    );

    if (existing.rows.length > 0) {
      const updated = await pool.query(
        `UPDATE cart_items 
         SET quantity = quantity + $1 
         WHERE user_id = $2 AND product_id = $3 
         RETURNING *`,
        [quantity, user_id, product_id]
      );
      return res.json(updated.rows[0]);
    }

    const newItem = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity, added_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [user_id, product_id, quantity]
    );

    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(" Error adding to cart:", err.message);
    res.status(500).json({ error: "Server error adding to cart" });
  }
});

/* -----------------------------------------------
    PUT Update cart item quantity
------------------------------------------------ */
router.put("/:cartItemId", async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    const updated = await pool.query(
      `UPDATE cart_items 
       SET quantity = $1 
       WHERE id = $2 
       RETURNING *`,
      [quantity, cartItemId]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(" Error updating cart item:", err.message);
    res.status(500).json({ error: "Server error updating cart item" });
  }
});

/* -----------------------------------------------
    DELETE a single cart item
------------------------------------------------ */
router.delete("/:cartItemId", async (req, res) => {
  const { cartItemId } = req.params;

  try {
    await pool.query(`DELETE FROM cart_items WHERE id = $1`, [cartItemId]);
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(" Error deleting cart item:", err.message);
    res.status(500).json({ error: "Server error deleting cart item" });
  }
});

/* -----------------------------------------------
    DELETE all cart items for a user (after order)
------------------------------------------------ */
router.delete("/clear/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    await pool.query(`DELETE FROM cart_items WHERE user_id = $1`, [user_id]);
    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (err) {
    console.error(" Error clearing cart:", err.message);
    res.status(500).json({ error: "Server error clearing cart" });
  }
});

export default router;
