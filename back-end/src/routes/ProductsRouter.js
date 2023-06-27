const express = require('express');
const productController = require('../controller/Products.controller');

const router = express.Router();

router.get('/', productController.getAllProducts);

module.exports = router;
