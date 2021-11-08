const { getConnection } = require('typeorm');
const { User } = require('../models/User');

function saveUserDAO(user) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.save(user);
}

function getUserByEmailDAO(email) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.findOne({ email });
}

module.exports = {
  saveUserDAO,
  getUserByEmailDAO,
};
