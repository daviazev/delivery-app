const { Product } = require('../../database/models');

async function getProducts() {
  const products = await Product.findAll();
  return products;
}

module.exports = { getProducts };
