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

async function getUserByName(name) {
  const user = await User.findOne({ where: { name } });
  return user;
}

async function register({ email, password, name, role }) {
  const pswHash = md5(password);
  const result = await User.create({ email, password: pswHash, name, role });
  const { id: _id, password: _password, ...resto } = result.dataValues;
  return resto;
}

const findByRole = async (role) => {
 const data = await User.findAll({ where: { role } });
 if (!data.length) return { status: 400, message: { message: 'Cannot get role' } };
 const result = data.map(({ dataValues }) => {
  const { password: _pass, ...dataWithotPass } = dataValues;
  return dataWithotPass;
 });
 return { status: 200, message: result };
};

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = { 
  login,
  getUserByEmail,
  register,
  findByRole,
  getUserByName,
  getUsers,
};
