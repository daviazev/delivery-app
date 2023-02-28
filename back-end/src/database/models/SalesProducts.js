module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'sales_products',
    modelName: 'SalesProduct',
  });

  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'sales',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SalesProduct,
    })
    models.Product.belongsToMany(models.Sale, {
      as: 'products',
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SalesProduct,
    })
  }

  return SalesProduct;
};
