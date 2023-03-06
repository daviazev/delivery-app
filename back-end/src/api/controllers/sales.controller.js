const salesService = require('../services/sales.service');

const postSales = async (req, res) => {
  const { status, message } = await salesService.postSales(req.body);
  return res.status(status).json(message);
};

const findSalesById = async (req, res) => {
  const { status, message } = await salesService.findSalesById(req.params.id);
  return res.status(status).json(message);
}

module.exports = {
  postSales,
  findSalesById,
};