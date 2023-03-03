const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const route = Router();

route.post('/sales', salesController.postSales);

module.exports = route;