// server/controllers/orderController.js
import pool from "../db.js"; // PostgreSQL connection

// =============================
//  Create New Order
// =============================
export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      total_amount,
      address_line_1,
      address_line_2,
      city,
      state,
      pincode,
      landmark,
      payment_method,
      items, // [{ product_id, quantity, price }]
    } = req.body;

    if (!user_id || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing order details" });
    }

    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insert order
      const orderResult = await client.query(
        `INSERT INTO orders 
          (user_id, total_amount, address_line_1, address_line_2, city, state, pincode, landmark, payment_method, status, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())
         RETURNING id`,
        [
          user_id,
          total_amount,
          address_line_1,
          address_line_2,
          city,
          state,
          pincode,
          landmark,
          payment_method,
          "Pending",
        ]
      );

      const orderId = orderResult.rows[0].id;

      // Insert order items
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price)
           VALUES ($1,$2,$3,$4)`,
          [orderId, item.product_id, item.quantity, item.price]
        );
      }

      await client.query("COMMIT");
      res.status(201).json({ message: "Order placed successfully", orderId });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Transaction Error:", error);
      res.status(500).json({ message: "Failed to place order" });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
//  Get All Orders for a User
// =============================
export const getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// =============================
//  Get Single Order (with Items)
// =============================
export const getOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;

    const order = await pool.query(`SELECT * FROM orders WHERE id = $1`, [
      order_id,
    ]);
    if (order.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const items = await pool.query(
      `SELECT oi.*, p.name, p.image, p.description
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [order_id]
    );

    res.json({ ...order.rows[0], items: items.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// =============================
//  Update Order Status (Admin)
// =============================
export const updateOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    await pool.query(`UPDATE orders SET status = $1 WHERE id = $2`, [
      status,
      order_id,
    ]);

    res.json({ message: "Order status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
};
