const jwt = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' });
const { getUserByEmail } = require('../services/user.service');

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(404).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);

    const { email } = decoded.data;

    const user = await getUserByEmail(email);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateJWT,
};