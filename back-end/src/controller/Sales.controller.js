const salesService = require('../service/Sales.service');

const createSale = async (req, res) => {
  const { id } = req.body.data;
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products } = req.body;

  const result = await salesService.createSale({
    userId: id,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status,
  });
console.log('result', result);
  const saleProduct = await salesService.createSaleProduct(products, result.id);

  return res.status(201).json({ result, saleProduct });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const saleProduct = await salesService.getSaleById(id);
  return res.status(200).json(saleProduct);
};

const putSaleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const saleProduct = await salesService.putSaleStatus(id, status);
  return res.status(200).json(saleProduct);
};

const getUserOrders = async (req, res) => {
  const { id } = req.body.data;
  const result = await salesService.getUserOrders(id);
  return res.status(200).json(result);
};

const getSellerOrders = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSellerOrders(id);
  return res.status(200).json(result);
};

module.exports = {
  createSale,
  getSaleById,
  putSaleStatus,
  getUserOrders,
  getSellerOrders,
};
