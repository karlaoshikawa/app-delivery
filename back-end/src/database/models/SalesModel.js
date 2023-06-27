/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define(
    "sales",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      sellerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      deliveryAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      deliveryNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      saleDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "sales",
      underscored: true,
      modelName: "sales",
    }
  );

  sales.associate = (models) => {
    sales.belongsTo(models.users, {
      foreignKey: "userId",
      as: "user",
    });

    sales.belongsTo(models.users, {
      foreignKey: "sellerId",
      as: "seller",
    });
  };
  return sales;
};
