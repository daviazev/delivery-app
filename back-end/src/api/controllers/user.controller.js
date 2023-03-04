const userService = require('../services/user.service');
const { generateToken } = require('../auth/generateToken');

async function login(req, res, _next) {
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);
    if (user.status === 200) {
      const token = generateToken(email, password);
      const { role, name, id } = user.user.dataValues;
      return res.status(200).json({ token, role, email, name, id });
    }
    return res.status(user.status).json({ message: user.message });
  } catch (error) {
    console.warn(error);
    return error;
  }
}

async function register(req, res) {
   const { email, password } = req.body;
  try {
    const result = await userService.register(req.body);
    const token = generateToken(email, password);
    return res.status(201).json({ ...result, token });
  } catch (error) {
    console.warn(error);
    return res.send(error);
  }
}

const findByRole = async (req, res) => {
  const { status, message } = await userService.findByRole(req.query.q);
  return res.status(status).json(message);
};

const getUsersController = async (_req, res, next) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return next(error)
  }
};

module.exports = { login, register, findByRole, getUsersController };
