const EntitySchema = require("typeorm").EntitySchema;
const ProductType = require("../models/ProductType").ProductType;

module.exports = new EntitySchema({
  name: "ProductType",
  target: ProductType,
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: true,
    },
    type: {
      type: "varchar",
      unique: true,
      length: 50,
      nullable: false,
    },
  },
});
