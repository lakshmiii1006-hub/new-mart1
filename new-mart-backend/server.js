import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/products.js";
import testimonialRoutes from "./routes/testimonials.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://new-mart-frontend-qwfeg9rdh-lakshmis-projects-872c7411.vercel.app",
  "https://new-mart1.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
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

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}

export default app;
