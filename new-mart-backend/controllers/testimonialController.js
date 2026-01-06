import Testimonial from "../models/Testimonial.js";

/* GET */
export const getTestimonials = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const testimonials = await Testimonial.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      testimonials,
      count: testimonials.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* CREATE */
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create({
      ...req.body,
      status: "pending",
    });

    res.status(201).json({
      message: "Submitted for admin approval",
      testimonial,
    });
  } catch (err) {
    res.status(500).json({ message: "Submit failed" });
  }
};

/* APPROVE */
export const approveTestimonial = async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Approved", testimonial: updated });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
    console.log(res.data)
  }
};

/* DENY */
export const denyTestimonial = async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: "denied" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Denied", testimonial: updated });
  } catch (err) {
    res.status(500).json({ message: "Deny failed" });
  }
};

/* DELETE */
export const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
