const { sales } = require('../database/models');
const { salesProducts } = require('../database/models');

const createSale = async (data) => {
  const date = { ...data, saleDate: new Date() };
  const sale = await sales.create(date);
  return sale;
};

const createSaleProduct = async (products, saleId) => {
  const saleProduct = await Promise.all(products.map(async (item) => {
    console.log('item', item);
    const { id, quantity } = item;
    const result = await salesProducts.create({
      saleId,
      productId: id,
      quantity,
    });
    return result;
  }));
  return saleProduct;
};

const getSaleById = async (id) => {
  const result = await sales.findByPk(id);
  return result;
};

const putSaleStatus = async (id, status) => {
  const result = await sales.update({ status }, { where: { id } });
  return result;
};

const getUserOrders = async (userId) => {
  const orders = await sales.findAll({
    where: { userId },
  });
  return orders;
};

const getSellerOrders = async (sellerId) => {
  const orders = await sales.findAll({
     where: { sellerId },
  });
  return orders;
};

module.exports = {
  createSale,
  createSaleProduct,
  getSaleById,
  putSaleStatus,
  getUserOrders,
  getSellerOrders,
};
