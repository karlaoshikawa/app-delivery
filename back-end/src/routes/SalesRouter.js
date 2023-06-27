const express = require('express');
const salesController = require('../controller/Sales.controller');
const { TokenValidation } = require('../middlewares/TokenValidation');

const router = express.Router();

router.post('/', TokenValidation, salesController.createSale);
router.get('/:id', salesController.getSaleById);
router.put('/:id', salesController.putSaleStatus);

module.exports = router;
