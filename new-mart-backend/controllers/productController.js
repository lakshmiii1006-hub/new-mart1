import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });

    // Group by category (for Product.jsx)
    const categories = {};
    products.forEach(p => {
      if (!categories[p.category]) {
        categories[p.category] = [];
      }
      categories[p.category].push(p);
    });

    res.json({
      success: true,
      products,     // ✅ flat array (Admin / AddProducts)
      categories    // ✅ grouped (User / Product.jsx)
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ error: error.message });
  }
};


// Admin: Add new product
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
