import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";


const app = express();

// Resolve directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS - allow requests from React frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware for parsing JSON request bodies
app.use(express.json());

// Serve static files (images, uploads, etc.)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/cart", cartRoutes); 
app.use("/api/orders", orderRoutes);


// Default route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
