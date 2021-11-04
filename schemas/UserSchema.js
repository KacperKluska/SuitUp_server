const { EntitySchema } = require('typeorm');
const { User } = require('../models/User');

module.exports = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    surname: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    email: {
      type: 'varchar',
      unique: true,
      length: 50,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
  },
});
