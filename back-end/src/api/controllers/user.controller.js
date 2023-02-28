const userService = require('../services/user.service');

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);
    return res.status(200).json(user)
  } catch (error) {
    console.log('>>>>>>>>>>', error);
    next(error)
  } 


  // return error ? res.status(status)
  //   .json({ message: error.message }) : res.status(status).json(data);
}

module.exports = { login };
