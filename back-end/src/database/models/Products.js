/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      //type: DataTypes.DECIMAL(4,2)
      type: DataTypes.DECIMAL(9,2)
      //Acho que pode acontecer de os preços podem passarem de 100R$
    },
    urlImage: {
      type: DataTypes.STRING
    },
  },
  {
    timestamps: false,
    underscored: true,
  });
  return products;
}
