const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../services/user.service')

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'secret';

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) throw ({
    status: 404,
    message: "Token not found"
  });

  try {
    const decoded = jwt.verify(token, secret);

    const email = decoded.data.email

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