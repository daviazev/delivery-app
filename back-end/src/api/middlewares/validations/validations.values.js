const { loginFieldsValidation } = require('./schema');

const validateLoginField = (email, password) => {
  const { error } = loginFieldsValidation.validate({ email, password });
  
  if (error) return { type: error.message, message: error.message };
  
  return { type: null, messsage: '' };
 };

module.exports = {
  validateLoginField,
};
