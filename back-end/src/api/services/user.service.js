const { User } = require("../../database/models");
const md5 = require('md5');

async function login(email, password) {
  const user = await User.findOne({ where: { email }  });

  if (!user) throw ({  
    status: 404,
    message: "User not found"
  });

  const passwordFromBD = user.dataValues.password;
  const passwordHash = md5(password)

  if (passwordHash !== passwordFromBD) throw ({
    status: 401,
    message: "Incorrect email or password",
  });
  
  return { status: 200, user };
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email }  });
  return user;
}

module.exports = { login, getUserByEmail };
