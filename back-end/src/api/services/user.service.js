const md5 = require('md5');
const { User } = require('../../database/models');

async function login(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user) return { status: 404, message: 'User not found' };

  const passwordFromBD = user.dataValues.password;
  const passwordHash = md5(password);

  if (passwordHash !== passwordFromBD) {
    return { status: 401, message: 'Incorrect email or password' };
  }

  return { status: 200, user };
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function register({ email, password, name }) {
  const pswHash = md5(password);
  const result = await User.create({ email, password: pswHash, name, role: 'customer' });
  // console.log('service', result);
  return result;
}

module.exports = { login, getUserByEmail, register };
