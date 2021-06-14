const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productBuy,
  listTransactions,
  productsBuy,
  listOrders,
} = require('../controllers/items');

router.get('/products', authenticate, getAllProducts);
router.get('/product', authenticate, getProduct);
router.post('/product', authenticate, createProduct);
router.put('/product', authenticate, updateProduct);
router.delete('/product', authenticate, deleteProduct);

// router.post('/product-buy', authenticate, productBuy);
// router.get('/product-transactions', authenticate, listTransactions);

router.post('/products-buy', authenticate, productsBuy);
router.get('/product-orders', authenticate, listOrders);

module.exports = router;
