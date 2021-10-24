const EntitySchema = require("typeorm").EntitySchema;
const Product = require("../models/Product").Product;

module.exports = new EntitySchema({
  name: "Product",
  target: Product,
  columns: {
    id: {
      type: "uuid",
      primary: true,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    price: {
      type: "decimal",
      nullable: false,
    },
    quantity: {
      type: "integer",
      nullable: false,
    },
    description: {
      type: "varchar",
      length: 1000,
      nullable: false,
    },
  },
  relations: {
    figures: {
      target: "Figure",
      type: "one-to-one",
      joinColumn: true,
      onDelete: "CASCADE",
    },
    product_types: {
      target: "ProductType",
      type: "one-to-one",
      joinColumn: true,
      onDelete: "CASCADE",
    },
    colors: {
      target: "Color",
      type: "one-to-one",
      joinColumn: true,
      onDelete: "CASCADE",
    },
    patterns: {
      target: "Pattern",
      type: "one-to-one",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});
