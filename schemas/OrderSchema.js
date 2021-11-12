const { EntitySchema } = require('typeorm');
const { Order } = require('../models/Order');

module.exports = new EntitySchema({
  name: 'Order',
  target: Order,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    filling_date: {
      type: 'date',
      nullable: false,
    },
    provide_date: {
      type: 'date',
    },
    price: {
      type: 'decimal',
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
    cartItems: {
      target: 'CartItem',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
