const bcrypt = require('bcrypt');
const {
  getUserByEmailDAO,
  saveUserDAO,
  getUserByIdDAO,
} = require('../dao/UserDao');
const { User } = require('../models/User');

async function getUserByEmail(email) {
  try {
    return await getUserByEmailDAO(email);
  } catch (err) {
    console.log(err);
  }
}

async function saveUser(name, surname, email, password) {
  try {
    const user = new User();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    return await saveUserDAO(user);
  } catch (err) {
    console.log(err);
  }
}

async function getUserData(id) {
  try {
    const result = await getUserByIdDAO(id);
    if (result)
      return {
        name: result.name,
        surname: result.surname,
        email: result.email,
      };
    return null;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getUserByEmail,
  saveUser,
  getUserData,
};
