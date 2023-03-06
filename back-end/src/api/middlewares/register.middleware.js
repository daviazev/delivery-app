const { getUserByEmail, getUserByName } = require('../services/user.service');
const { validateAdminPostUserFields } = require('./validations/validations.values');

const registerValidation = async (req, res, next) => {
  const { email } = req.body;

  const userExists = await getUserByEmail(email);
  if (userExists) return res.status(409).json({ message: 'User already exists' });

  next();
};

const adminRegisterValidation = async (req, res, next) => {
  const { email, name, password } = req.body;
  const validate = validateAdminPostUserFields(email, name, password);

  if (validate.type) {
    const { message } = validate;
    return res.status(400).json({ message });
  }

  const emailExists = await getUserByEmail(email);
  const nameExists = await getUserByName(name);

  if (emailExists || nameExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  next();
};

module.exports = { registerValidation, adminRegisterValidation };
