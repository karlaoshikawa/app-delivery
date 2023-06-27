/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const salesModel = require('./SalesModel');
const productModel = require('./Products');

module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define(
    "salesProducts",
    {
      saleId: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
          references: {
          model: 'sales',
          key: 'id',
        },
      },
      productId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
          references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: "sales_products",
      underscored: true,
      // modelName: "sales_products",
    }
  );

salesProducts.associate = (models) => {
  salesProducts.belongsTo(models.sales, {
    foreignKey: 'saleId',
    as: 'sale',
  });

  salesProducts.belongsTo(models.products, {
    foreignKey: 'productId',
    as: 'product',
  });
};


  return salesProducts;
};
