const errorHandler = (err, req, res, next) => {
  console.log(err);

  const status = err.status || 500;
  const message = err.message || "Erro interno";

  return res.status(status).json({ error: message });
}

module.exports = errorHandler;
