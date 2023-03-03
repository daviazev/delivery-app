const validateUser = (req, res, next) => {
  const { q } = req.query;
  if (!q) return res.status(404).json({ message: 'Query parameter not found' });
  return next();
}

module.exports = validateUser