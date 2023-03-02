const userService = require('../services/user.service');
const { generateToken } = require('../auth/generateToken');

async function login(req, res, _next) {
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);
    console.log('==>', user);
    if (user.status === 200) {
      const token = generateToken(email, password);
      const { role, name } = user.user.dataValues;
      return res.status(200).json({ token, role, email, name });
    }
    return res.status(user.status).json({ message: user.message });
  } catch (error) {
    console.warn(error);
    return error;
  }
}

async function register(req, res) {
  console.log(req.body);
  try {
    const result = await userService.register(req.body);
    // console.log('controller', result);
    return res.status(201).json(result);
  } catch (error) {
    console.warn(error);
    return res.send(error);
  }
}

module.exports = { login, register };
