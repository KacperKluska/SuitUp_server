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
  return userShipmentDetailsRepository.findOne({ user_id: userId });
}

function updateUserShipmentDetailsDAO(userId, newData) {
  const connection = getConnection();
  const userShipmentDetailsRepository =
    connection.getRepository(UserShipmentDetails);
  return userShipmentDetailsRepository.update({ user_id: userId }, newData);
}

module.exports = {
  saveUserShipmentDetailsDAO,
  getUserShipmentDetailsDAO,
  updateUserShipmentDetailsDAO,
};
