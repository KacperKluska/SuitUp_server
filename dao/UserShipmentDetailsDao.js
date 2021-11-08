const { getConnection } = require('typeorm');
const { UserShipmentDetails } = require('../models/UserShipmentDetails');

function saveUserShipmentDetailsDAO(userShipmentDetails) {
  const connection = getConnection();
  const userShipmentDetailsRepository =
    connection.getRepository(UserShipmentDetails);
  return userShipmentDetailsRepository.save(userShipmentDetails);
}

function getUserShipmentDetailsDAO(userId) {
  const connection = getConnection();
  const userShipmentDetailsRepository =
    connection.getRepository(UserShipmentDetails);
  return userShipmentDetailsRepository.findOne({ users: userId });
}

function updateUserShipmentDetailsDAO(userId, newData) {
  const connection = getConnection();
  const userShipmentDetailsRepository =
    connection.getRepository(UserShipmentDetails);
  return userShipmentDetailsRepository.update({ users: userId }, newData);
}

module.exports = {
  saveUserShipmentDetailsDAO,
  getUserShipmentDetailsDAO,
  updateUserShipmentDetailsDAO,
};
