const { EntitySchema } = require('typeorm');
const { CartItem } = require('../models/CartItem');

module.exports = new EntitySchema({
  name: 'CartItem',
  target: CartItem,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    quantity: {
      type: 'integer',
      default: 1,
      nullable: false,
    },
  },
  relations: {
    carts: {
      target: 'Cart',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    products: {
      target: 'Product',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
