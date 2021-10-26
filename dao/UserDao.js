const User = require("../models/User").User;
const getConnection = require("typeorm").getConnection;

function saveUserDAO(user) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.save(user);
}

function getUserByEmailDAO(email) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.findOne({ email: email });
}

module.exports = {
  saveUserDAO,
  getUserByEmailDAO,
};
