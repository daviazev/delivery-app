const { getUserByEmail, getUserByName } = require('../services/user.service');

const registerValidation = async (req, res, next) => {
  const { email } = req.body;

  const userExists = await getUserByEmail(email);
  if (userExists) return res.status(409).json({ message: 'User already exists' });

  next();
};

const adminRegisterValidation = async (req, res, next) => {
  const { email, name } = req.body;

  const emailExists = await getUserByEmail(email);
  const nameExists = await getUserByName(name);

  if (emailExists || nameExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  next();
};

module.exports = { registerValidation, adminRegisterValidation };
