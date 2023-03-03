const salesService = require('../services/sales.service');

const postSales = async (req, res) => {
  const { status, message } = await salesService.postSales(req.body);
  return res.status(status).json(message);
};

module.exports = {
  postSales,
};