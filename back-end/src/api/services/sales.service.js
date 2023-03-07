const { Sale, SalesProduct, Product } = require('../../database/models/index');
const mergeProductInfos = require('../utils');

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

const findSalesById = async (saleId) => {
  const data = await SalesProduct.findAll({ where: { saleId } });
  if (!data) return { status: 400, message: 'Cannot find sale' };
  const products = await Promise.all(data.map(async ({ productId, quantity }) => {
    const { dataValues } = await Product.findOne({ where: { id: productId } });
    const allProducts = { ...dataValues, quantity };
    return allProducts;
  }));
  return { status: 200, message: products };
};

async function getSales() {
  const sales = await Sale.findAll();
  return sales;
}

async function getSaleDetails(id) {
  const sale = await Sale.findOne({
    where: { id },
      attributes: { exclude: [
      'userId', 'sellerId', 'deliveryAddress', 'deliveryNumber',
    ] },
  });
  const productSales = await SalesProduct.findAll({
    where: { saleId: id }, attributes: { exclude: ['saleId'] },
  });
  const products = await Promise.all(productSales.map(async (p) => {
    const dataValues = await Product.findOne({
      where: { id: p.productId },
    });
    return dataValues;
  }));
  const mergedSalesInfos = mergeProductInfos({ sale, productSales, products });
  return mergedSalesInfos;
}

module.exports = {
  postSales,
  findSalesById,
  getSales,
  getSaleDetails,
};
