const { salesProducts } = require('../database/models');
const { products } = require('../database/models');

const createOrderProducts = async ({ saleId, productId, quantity }) => {
  const orders = await salesProducts.create({ saleId, productId, quantity });
  return orders;
};

const getSaleProducts = async (id) => {
  const productsList = await salesProducts.findAll({
    where: { saleId: id },
    include: [
      { model: products, as: 'product', attributes: ['name', 'price'] },
    ],
  });
return productsList;
};

module.exports = { createOrderProducts, getSaleProducts };