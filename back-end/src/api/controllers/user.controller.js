const userService = require('../services/user.service');
const { generateToken } = require('../auth/generateToken')

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);
    if (user.status === 200) {
      const token = generateToken(email, password)
      const role = user.user.dataValues.role;
      return res.status(200).json({ token, role })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { login };
