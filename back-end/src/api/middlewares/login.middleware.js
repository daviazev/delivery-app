const { validateLoginField } = require('./validations/validations.values');

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  
  const validation = validateLoginField(email, password);

  const { message } = validation;
  // console.log(validation);
  
  if (validation.type) {
    throw new Error({ status: 400, message });
  }
  
  return next();
};
  
module.exports = {
  loginValidation,
};