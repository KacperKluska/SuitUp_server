const EntitySchema = require('typeorm').EntitySchema;
const Pattern = require('../models/Pattern').Pattern;

module.exports = new EntitySchema({
  name: 'Pattern',
  target: Pattern,
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true,
    },
    pattern: {
      type: 'varchar',
      unique: true,
      length: 50,
      nullable: false,
    },
  },
});
