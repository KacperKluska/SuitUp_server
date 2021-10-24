class UserShipmentDetails {
  constructor(id, country, city, street, house_number, phone_number, user_id) {
    this.id = id;
    this.country = country;
    this.city = city;
    this.street = street;
    this.house_number = house_number;
    this.phone_number = phone_number;
    this.user_id = user_id;
  }
}

module.exports = { UserShipmentDetails };
