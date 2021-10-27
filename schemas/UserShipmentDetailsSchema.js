const EntitySchema = require('typeorm').EntitySchema;
const UserShipmentDetails =
  require('../models/UserShipmentDetails').UserShipmentDetails;

module.exports = new EntitySchema({
  name: 'UserShipmentDetails',
  target: UserShipmentDetails,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
    },
    country: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    city: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    street: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    house_number: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    phone_number: {
      type: 'varchar',
      length: 15,
      nullable: false,
    },
  },
  relations: {
    users: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
