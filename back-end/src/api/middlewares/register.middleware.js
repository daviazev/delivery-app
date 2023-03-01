const { getUserByEmail } = require("../services/user.service");

const registerValidation = async (req, res, next) => {
  const { email } = req.body;

  const userExists = await getUserByEmail(email);
  if (userExists) return res.status(409).json({ message: 'User already exists' });

  next();
}

module.exports = { registerValidation };