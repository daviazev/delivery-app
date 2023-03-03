const { Sale } = require('../../database/models/index');

const postSales = async (body) => {
  const data = await Sale.create({ ...body });
  if (!data) return { status: 400, message: 'Cannot post sale' };
  const { dataValues } = data;
  return { status: 201, message: dataValues };
};

module.exports = {
  postSales,
};