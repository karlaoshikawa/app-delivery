const saleProductService = require('../service/SalesProduct.service');

const createOrderProducts = async (req, res) => {
  const { saleId, productId, quantity } = req.body;
  const result = await saleProductService.createOrderProducts({ saleId, productId, quantity });
  return res.status(201).json(result);
};

const getSaleProducts = async (req, res) => {
  const { id } = req.params;
  const result = await saleProductService.getSaleProducts(id);
  return res.status(200).json(result);
};

module.exports = {
  createOrderProducts,
  getSaleProducts,
};
