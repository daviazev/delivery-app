const { Router } = require('express');
const { validateJWT } = require('../auth/jwtFunctions');
const salesController = require('../controllers/sales.controller');

const route = Router();

route.post('/', validateJWT, salesController.postSales);
route.get('/:id', salesController.findSalesById);

route.get('/seller/orders', validateJWT, salesController.getSalesController);

module.exports = route;
