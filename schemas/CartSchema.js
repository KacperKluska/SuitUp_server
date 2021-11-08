const { EntitySchema } = require('typeorm');
const { Cart } = require('../models/Cart');

module.exports = new EntitySchema({
  name: 'Cart',
  target: Cart,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
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
