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
    models.Sales.belongsToMany(models.SalesProduct, {
      as: 'sale',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SalesProduct,
    })
    models.SalesProduct.belongsToMany(models.Product, {
      as: 'products',
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SalesProduct,
    })
  }

  return SalesProduct;
};
