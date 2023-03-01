const productService = require('../services/product.service');

async function getProductsController(_req, res) {
  try {
    const products = await productService.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'erro interno' });
  }
}

module.exports = { getProductsController };
