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
