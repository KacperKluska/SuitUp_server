const EntitySchema = require('typeorm').EntitySchema;
const Color = require('../models/Color').Color;

module.exports = new EntitySchema({
  name: 'Color',
  target: Color,
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true,
    },
    color: {
      type: 'varchar',
      unique: true,
      length: 50,
      nullable: false,
    },
  },
});
