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

function getUserByIdDAO(id) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.findOne({ id });
}

module.exports = {
  saveUserDAO,
  getUserByEmailDAO,
  getUserByIdDAO,
};
