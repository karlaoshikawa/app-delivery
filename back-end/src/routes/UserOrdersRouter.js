const express = require('express');
const salesController = require('../controller/Sales.controller');
const { TokenValidation } = require('../middlewares/TokenValidation');

const router = express.Router();

router.get('/', TokenValidation, salesController.getUserOrders);
router.get('/:id', TokenValidation, salesController.getSellerOrders);

module.exports = router;
