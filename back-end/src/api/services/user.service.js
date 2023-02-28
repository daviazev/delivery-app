const { User } = require("../../database/models");
const { compare } = require('bcryptjs');

const validatePassword = async (password, cryptPassword) => compare(password, cryptPassword);

async function login(email, password) {
  const user = await User.findOne({ where: { email }  });

  if (!user) throw ({  
    status: 404,
    message: "Usuário não encontrado"
  });

  if (await validatePassword(password, user.dataValues.password) === false) {
    throw ({
      status: 401,
      message: "Incorrect email or password",
    });
  }

  // const token = createToken(user as User);

  // return { status: 200, data: { token } };

  return { status: 200 };
}

module.exports = { login };
