const bcrypt = require('bcrypt');
const { getUserByEmailDAO, saveUserDAO } = require('../dao/UserDao');
const { v4 } = require('uuid');
const User = require('../models/User').User;

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

module.exports = {
  getUserByEmail,
  saveUser,
};
