require('dotenv/config');
const jwt = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' });

const generateToken = (email, password) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email, password } }, jwtKey, jwtConfig);

  return token;
};

module.exports = {
  generateToken,
};
