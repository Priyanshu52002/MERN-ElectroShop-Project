const express = require('express');
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const { protectUser, isAuthorised } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.route('/getProducts')
      .get(getProducts);

router.route('/getProduct/:id')
      .get(getProduct);

// Protected and authorized routes
router.use(protectUser);
router.use(isAuthorised(['admin']));

router.route('/admin')
      .get(getProducts);

router.route('/delete/:id')
      .delete(deleteProduct)
router.route('/update/:id')
      .put(updateProduct);

router.route('/create')
      .post(createProduct);

module.exports = router;
