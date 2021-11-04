const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const {
  getUserByEmailDAO,
  saveUserDAO,
  getUserByIdDAO,
} = require('../dao/UserDao');
const { User } = require('../models/User');

async function getUserByEmail(email) {
  try {
    return await getUserByEmailDAO(email);
  } catch (error) {
    console.log(error);
  }
}

async function saveUser(name, surname, email, password) {
  try {
    const user = new User();
    user.id = v4();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    return await saveUserDAO(user);
  } catch (error) {
    console.log(error);
  }
}

async function getUserData(id) {
  const result = await getUserByIdDAO(id);
  if (result)
    return { name: result.name, surname: result.surname, email: result.email };
  return null;
}

module.exports = {
  getUserByEmail,
  saveUser,
  getUserData,
};
