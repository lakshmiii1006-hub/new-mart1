import express from "express";
import {
  getTestimonials,
  createTestimonial,
  approveTestimonial,
  denyTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", createTestimonial);
router.patch("/:id/approve", approveTestimonial);
router.patch("/:id/deny", denyTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
