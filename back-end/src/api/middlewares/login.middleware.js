const { validateLoginField } = require('./validations/validations.values')

const loginValidation = (req, _res, next) => {
  const { email, password } = req.body;
  
  const validation = validateLoginField(email, password);

  const { message } = validation;
  
  if (validation.type) { 
    throw({ status: 400, message });
  }
  
  return next();
};
  
module.exports = {
  loginValidation,
}