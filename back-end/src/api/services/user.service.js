const User = require("../../database/models");
const { compare } = require('bcryptjs');

async function login(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { status: 401, error: { message: 'Incorrect email or password' } };
  }

  const compare = compare(password, user.password);

  if (!compare) {
    return { status: 401, error: { message: 'Incorrect email or password' } };
  }

  // const token = createToken(user as User);

  // return { status: 200, data: { token } };

  return { status: 200, data: { token } };
}

module.exports = { login };
