import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/products.js";
import testimonialRoutes from "./routes/testimonials.js";

dotenv.config();

const app = express();

/* ===================== CORS ===================== */
// Safe for local + production
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

/* ===================== DATABASE ===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ===================== ROUTES ===================== */
app.get("/", (req, res) => {
  res.json({ message: "New Mart API running 🚀" });
});

app.use("/api/products", productRoutes);
app.use("/api/testimonials", testimonialRoutes);

/* ===================== SERVER START ===================== */
/**
 * ✅ IMPORTANT:
 * - Vercel: app.listen() is NOT used
 * - Local / Railway: app.listen() IS required
 */
const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

/* ===================== EXPORT ===================== */
export default app;
