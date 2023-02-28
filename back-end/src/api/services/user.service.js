const md5 = require('md5');
const { User } = require('../../database/models');

async function login(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return {  
       status: 404,
       message: 'User not found',
     };
  }

  const passwordFromBD = user.dataValues.password;
  const passwordHash = md5(password);

  if (passwordHash !== passwordFromBD) {
    return {
       status: 401,
       message: 'Incorrect email or password',
     }; 
  }
  // {"hasToken": false, "method": "POST", "status": 404}
  
  return { status: 200, user };
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

module.exports = { login, getUserByEmail };
