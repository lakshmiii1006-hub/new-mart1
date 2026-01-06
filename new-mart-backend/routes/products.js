import express from 'express';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.put('/:id', updateProduct);     // ✅ ADD
router.delete('/:id', deleteProduct);  // ✅ ADD

export default router;
