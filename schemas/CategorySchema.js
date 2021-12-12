const { EntitySchema } = require('typeorm');
const { Category } = require('../models/Category');

module.exports = new EntitySchema({
  name: 'Category',
  target: Category,
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true,
    },
    category: {
      type: 'varchar',
      unique: true,
      length: 50,
      nullable: false,
    },
  },
});
