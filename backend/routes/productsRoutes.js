import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/:asin", async (req, res) => {
  const { asin } = req.params;

  try {
    // 1️ Get main product details
    const productRes = await pool.query(
      `SELECT id, asin, title, brand, price, original_price, description, category, stock, about_item, heading
       FROM products
       WHERE asin = $1`,
      [asin]
    );

    if (productRes.rows.length === 0)
      return res.status(404).json({ message: "Product not found" });

    const product = productRes.rows[0];
    const productId = product.id;

    // 2️ Get additional details/specifications
    const detailsRes = await pool.query(
      `SELECT detail_key, detail_value FROM product_details WHERE product_id = $1`,
      [productId]
    );

    // 3️ Get product media (images/videos)
    const mediaRes = await pool.query(
      `SELECT media_url FROM product_media WHERE product_id = $1`,
      [productId]
    );

    // 4️ Get reviews + join with users (includes profile pics)
    const reviewsRes = await pool.query(
      `SELECT
         r.id,
         r.review_title,
         r.review_text,
         r.rating,
         r.created_at,
         u.name AS reviewer_name,
         u.profile_pic AS reviewer_pic
       FROM reviews r
       JOIN users u ON r.user_id = u.user_id
       WHERE r.product_id = $1
       ORDER BY r.created_at DESC`,
      [productId]
    );

    const reviewIds = reviewsRes.rows.map((r) => r.id);

    // 5️ Get review media (images/videos posted by users)
    let reviewMediaRes = { rows: [] };
    if (reviewIds.length > 0) {
      reviewMediaRes = await pool.query(
        `SELECT review_id, media_url, media_type
         FROM review_media
         WHERE review_id = ANY($1::int[])`,
        [reviewIds]
      );
    }

    // 6️ Group media by review_id
    const mediaByReview = {};
    reviewMediaRes.rows.forEach((m) => {
      if (!mediaByReview[m.review_id]) {
        mediaByReview[m.review_id] = [];
      }
      mediaByReview[m.review_id].push({
        media_url: m.media_url,
        media_type: m.media_type,
      });
    });

    // 7️ Calculate average rating and total reviews
    const ratingSummary = await pool.query(
      `SELECT ROUND(AVG(rating)::numeric, 1) AS avg_rating, COUNT(*) AS total_reviews
       FROM reviews WHERE product_id = $1`,
      [productId]
    );

    const { avg_rating, total_reviews } = ratingSummary.rows[0];

    // 8️ Combine all info
    const data = {
      asin: product.asin,
      title: product.title,
      heading: product.heading,
      brand: product.brand,
      price: product.price,
      original_price: product.original_price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      about_item: product.about_item,
      avg_rating,
      total_reviews,
      images: mediaRes.rows.map((r) => r.media_url),
      details: {
        bullets: detailsRes.rows.map(
          (d) => `${d.detail_key}: ${d.detail_value}`
        ),
        specs: detailsRes.rows.reduce((acc, d) => {
          acc[d.detail_key] = d.detail_value;
          return acc;
        }, {}),
      },
      reviews: reviewsRes.rows.map((r) => ({
        id: r.id,
        reviewer_name: r.reviewer_name,
        reviewer_pic: r.reviewer_pic,
        review_title: r.review_title,
        review_text: r.review_text,
        rating: r.rating,
        created_at: r.created_at,
        media: mediaByReview[r.id] || [],
      })),
    };

    res.json(data);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
