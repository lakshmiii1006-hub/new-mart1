import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/products.js";
import testimonialRoutes from "./routes/testimonials.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error", err));

app.get("/", (req, res) => {
  res.json({ message: "New Mart API running" });
});

app.use("/api/products", productRoutes);
app.use("/api/testimonials", testimonialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
