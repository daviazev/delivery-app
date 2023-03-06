const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const route = Router();

route.post('/', salesController.postSales);
route.get('/:id', salesController.findSalesById)

module.exports = route;