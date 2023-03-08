const { Router } = require('express');
const { validateJWT } = require('../auth/jwtFunctions');
const salesController = require('../controllers/sales.controller');

const route = Router();

route.post('/sales', validateJWT, salesController.postSales);
route.get('/sales/:id', salesController.findSalesById);
route.get('/seller/orders', validateJWT, salesController.getSalesController);
route.get('/seller/orders/:id', validateJWT, salesController.getSaleDetailsById);
route.put('/seller/orders/:id', validateJWT, salesController.handleStatusController);
route.get('/orders/:id', validateJWT, salesController.getSalesId);

module.exports = route;
