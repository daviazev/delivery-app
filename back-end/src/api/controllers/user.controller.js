const userService = require('../services/user.service');
const { generateToken } = require('../auth/generateToken');

async function login(req, res, _next) {
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);
    console.log(user);
    if (user.status === 200) {
      const token = generateToken(email, password);
      const { role } = user.user.dataValues;
      return res.status(200).json({ token, role });
    }
    return res.status(user.status).json({ message: user.message });
  } catch (error) {
    console.warn(error);
    return error;
    // next(error);
    // return res.json({"hasToken": false, "method": "POST", "status": 404});
  }
}

module.exports = { login };
