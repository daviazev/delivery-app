const { Sale, SalesProduct } = require('../../database/models/index');

const postSales = async (body) => {
  const { products, ...sale } = body;
  const data = await Sale.create({ ...sale });
  if (!data) return { status: 400, message: 'Cannot post sale' };
  const { dataValues } = data;
  const { id: saleId } = dataValues;
  await Promise.all(products.map(async ({ productId, quantity }) => {
    const result = await SalesProduct.create({ saleId, productId, quantity });
    return result;
  }));
  return { status: 201, message: dataValues };
};

module.exports = {
  postSales,
};