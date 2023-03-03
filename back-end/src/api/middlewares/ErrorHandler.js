const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Erro interno';
  return res.status(status).json({ error: message });
};

module.exports = errorHandler;
