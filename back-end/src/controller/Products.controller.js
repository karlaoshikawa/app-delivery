const productsService = require('../service/Products.service');

const getAllProducts = async (req, res) => {
  const { type, message } = await productsService.getAllProducts();
  return res.status(type).json(message);
};

module.exports = {
  getAllProducts,
};