const express = require('express');
const salesProductController = require('../controller/SalesProduct.controller');

const router = express.Router();

router.post('/', salesProductController.createOrderProducts);
router.get('/:id', salesProductController.getSaleProducts);

module.exports = router;