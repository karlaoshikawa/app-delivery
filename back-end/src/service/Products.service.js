const { products } = require('../database/models');

const getAllProducts = async () => {
  const productsList = await products.findAll();
  return { type: 200, message: productsList };
};

module.exports = { getAllProducts };