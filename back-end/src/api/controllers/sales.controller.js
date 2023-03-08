const salesService = require('../services/sales.service');

const postSales = async (req, res) => {
  const { status, message } = await salesService.postSales(req.body);
  return res.status(status).json(message);
};

const findSalesById = async (req, res) => {
  const { status, message } = await salesService.findSalesById(req.params.id);
  return res.status(status).json(message);
};

async function getSalesController(_req, res) {
  try {
    const sales = await salesService.getSales();
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'erro interno' });
  }
}

const getSaleDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await salesService.getSaleDetails(id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const data = await salesService.handleStatus({ status, id });
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postSales,
  findSalesById,
  getSalesController,
  getSaleDetailsById,
  handleStatusController,
};
