const EntitySchema = require("typeorm").EntitySchema;
const Cart = require("../models/Cart").Cart;

module.exports = new EntitySchema({
  name: "Cart",
  target: Cart,
  columns: {
    id: {
      primary: true,
      type: "uuid",
    },
  },
  relations: {
    users: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});
