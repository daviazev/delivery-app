const { Sale, SalesProduct } = require('../../database/models/index');

const postSales = async (body) => {
  const { products, ...sale } = body;
  const data = await Sale.create({ ...sale });
  if (!data) return { status: 400, message: 'Cannot post sale' };
  const { dataValues } = data;
  const { id: saleId } = dataValues;
  console.log('saleId', saleId);
  await Promise.all(products.map(async ({ productId, quantity }) => {
    console.log('product id e quantity');
    console.log(productId, quantity);
    const result = await SalesProduct.create({ saleId, productId, quantity });
    return result;
  }));
  return { status: 201, message: dataValues };
};

async function getSales() {
  const sales = await Sale.findAll();
  return sales;
}

module.exports = {
  postSales,
  getSales,
};
