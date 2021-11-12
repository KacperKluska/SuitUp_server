const {
  saveUserShipmentDetailsDAO,
  getUserShipmentDetailsDAO,
  updateUserShipmentDetailsDAO,
} = require('../dao/UserShipmentDetailsDao');
const { UserShipmentDetails } = require('../models/UserShipmentDetails');

async function saveUserShipmentDetails(
  country,
  city,
  street,
  house_number,
  phone_number,
  user_id,
) {
  try {
    const userDetails = new UserShipmentDetails();
    userDetails.id = null;
    userDetails.country = country;
    userDetails.city = city;
    userDetails.street = street;
    userDetails.house_number = house_number;
    userDetails.phone_number = phone_number;
    userDetails.users = user_id;
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

async function updateAllUserShipmentDetails(
  userId,
  country,
  city,
  street,
  house_number,
  phone_number,
) {
  try {
    const newData = {
      country,
      city,
      street,
      house_number,
      phone_number,
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
