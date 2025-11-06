// server/routes/ordersRoutes.js
import express from "express";
import pool from "../db/db.js";

const router = express.Router();

/* ---------------------------------------------------
   POST /api/orders — Place a new order
--------------------------------------------------- */
router.post("/", async (req, res) => {
  const { items, address, totalPrice, payment_method, user_id, address_id } = req.body;

  //  Basic validation
  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid or missing items/user_id" });
  }

  if (!address || !address.city || !address.state || !address.pincode) {
    return res.status(400).json({ error: "Incomplete address details" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    //  Insert into orders table
    const orderResult = await client.query(
      `
      INSERT INTO orders (
        total_amount, created_at,
        address_line_1, address_line_2, city, state, pincode, landmark,
        payment_method, user_id, address_id, items, status
      )
      VALUES (
        $1, NOW(), $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12
      )
      RETURNING id
      `,
      [
        totalPrice,
        address.address_line_1 || address.address_line || "",
        address.address_line_2 || "",
        address.city,
        address.state,
        address.pincode,
        address.landmark || "",
        payment_method || "COD", // default payment method
        user_id,
        address_id || null,
        JSON.stringify(items),
        "Pending",
      ]
    );

    const orderId = orderResult.rows[0].id;

    //  Insert order items
    const insertItemsQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
    `;

    for (const item of items) {
      if (!item.product_id || !item.quantity || !item.price) continue;
      await client.query(insertItemsQuery, [
        orderId,
        item.product_id,
        item.quantity,
        item.price,
      ]);
    }

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      orderId,
      message: " Order placed successfully!",
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(" Order creation failed:", err.message);
    res.status(500).json({ error: "Server error placing order" });
  } finally {
    client.release();
  }
});

/* ---------------------------------------------------
   GET /api/orders/:userId — Fetch user's orders
--------------------------------------------------- */
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await pool.query(
      `SELECT 
         o.id AS order_id,
         o.total_amount,
         o.created_at,
         o.status,
         o.payment_method,
         o.address_line_1,
         o.address_line_2,
         o.city,
         o.state,
         o.pincode,
         o.landmark,
         json_agg(
           json_build_object(
             'product_id', oi.product_id,
             'quantity', oi.quantity,
             'price', oi.price,
             'title', p.title,
             'image_url', (
               SELECT pm.media_url 
               FROM product_media pm 
               WHERE pm.product_id = p.id AND pm.thumbnail_order = 1 
               LIMIT 1
             )
           )
         ) AS items
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(orders.rows);
  } catch (err) {
    console.error(" Error fetching user orders:", err.message);
    res.status(500).json({ error: "Server error fetching user orders" });
  }
});

/* ---------------------------------------------------
   GET /api/orders — Admin: Fetch all orders
--------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const allOrders = await pool.query(
      `SELECT id, user_id, total_amount, status, payment_method, created_at 
       FROM orders 
       ORDER BY created_at DESC`
    );
    res.json(allOrders.rows);
  } catch (err) {
    console.error(" Error fetching all orders:", err.message);
    res.status(500).json({ error: "Server error fetching all orders" });
  }
});


/* ---------------------------------------------------
   DELETE /api/orders/:orderId — Cancel/Delete an order
--------------------------------------------------- */
router.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    //  First delete from order_items (foreign key dependency)
    await client.query("DELETE FROM order_items WHERE order_id = $1", [orderId]);

    //  Then delete the main order record
    const result = await client.query("DELETE FROM orders WHERE id = $1 RETURNING id", [orderId]);

    await client.query("COMMIT");

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ success: true, message: " Order deleted successfully!" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(" Error deleting order:", err.message);
    res.status(500).json({ error: "Server error deleting order" });
  } finally {
    client.release();
  }
});



export default router;
