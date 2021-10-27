const EntitySchema = require('typeorm').EntitySchema;
const Opinion = require('../models/Opinion').Opinion;

module.exports = new EntitySchema({
  name: 'Opinion',
  target: Opinion,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    rate: {
      type: 'integer',
      nullable: true,
    },
    comment: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
  },
  relations: {
    products: {
      target: 'Product',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
