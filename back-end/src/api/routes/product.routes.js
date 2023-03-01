const { Router } = require('express');
const { getProductsController } = require('../controllers/product.controller');

const router = Router();

router.get('/products', getProductsController);

module.exports = router;
