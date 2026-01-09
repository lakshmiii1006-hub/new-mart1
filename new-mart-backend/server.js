import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/products.js";
import testimonialRoutes from "./routes/testimonials.js";

dotenv.config();

const app = express();

// ✅ TEMP OPEN CORS (FOR VERCEL)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error", err));

app.get("/", (req, res) => {
  res.json({ message: "New Mart API running" });
});

app.use("/api/products", productRoutes);
app.use("/api/testimonials", testimonialRoutes);

// ❌ NO app.listen() on Vercel
export default app;
