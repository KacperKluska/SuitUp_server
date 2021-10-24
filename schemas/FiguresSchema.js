const EntitySchema = require("typeorm").EntitySchema;
const Figure = require("../models/Figure").Figure;

module.exports = new EntitySchema({
  name: "Figure",
  target: Figure,
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: true,
    },
    figure: {
      type: "varchar",
      unique: true,
      length: 50,
      nullable: false,
    },
  },
});
