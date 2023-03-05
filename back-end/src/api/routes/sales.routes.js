const { Router } = require('express');
const { validateJWT } = require('../auth/jwtFunctions');
const salesController = require('../controllers/sales.controller');

const route = Router();

route.post('/sales', salesController.postSales);

route.get('/seller/orders', validateJWT, salesController.getSalesController);

module.exports = route;
