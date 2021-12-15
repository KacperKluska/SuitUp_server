const {
  saveUserShipmentDetailsDAO,
  getUserShipmentDetailsDAO,
  updateUserShipmentDetailsDAO,
} = require('../dao/UserShipmentDetailsDao');
const { UserShipmentDetails } = require('../models/UserShipmentDetails');

async function saveUserShipmentDetails(data) {
  try {
    const userDetails = new UserShipmentDetails(null, ...data);
    return await saveUserShipmentDetailsDAO(userDetails);
  } catch (err) {
    console.error(err);
  }
}

async function getUserShipmentDetails(userId) {
  try {
    const userDetails = await getUserShipmentDetailsDAO(userId);
    if (userDetails) {
      return {
        country: userDetails.country,
        city: userDetails.city,
        street: userDetails.street,
        house_number: userDetails.house_number,
        phone_number: userDetails.phone_number,
      };
    }
  } catch (err) {
    console.error(err);
  }
}

async function updateAllUserShipmentDetails(data) {
  try {
    const newData = {
      country: data.country,
      city: data.city,
      street: data.street,
      house_number: data.house_number,
      phone_number: data.phone_number,
    };
    return await updateUserShipmentDetailsDAO(userId, newData);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  saveUserShipmentDetails,
  getUserShipmentDetails,
  updateAllUserShipmentDetails,
};
