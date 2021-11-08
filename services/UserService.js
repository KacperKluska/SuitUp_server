const bcrypt = require('bcrypt');
const { getUserByEmailDAO, saveUserDAO } = require('../dao/UserDao');
const { v4 } = require('uuid');
const User = require('../models/User').User;

async function getUserByEmail(email) {
  try {
    return await getUserByEmailDAO(email);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function saveUser(name, surname, email, password) {
  try {
    const user = new User(
      name,
      surname,
      email,
      await bcrypt.hash(password, 10),
    );
    return saveUserDAO(user);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getUserByEmail,
  saveUser,
};
