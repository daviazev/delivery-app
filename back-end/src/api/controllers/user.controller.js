const userService = require('../services/user.service');

async function login(req, res) {
  const userCredentials = req.body;

  const { status, data, error } = await userService.login(userCredentials);

  return error ? res.status(status)
    .json({ message: error.message }) : res.status(status).json(data);
}

module.exports = { login };
