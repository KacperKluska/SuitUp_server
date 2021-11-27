const { EntitySchema } = require('typeorm');
const { Product } = require('../models/Product');

module.exports = new EntitySchema({
  name: 'Product',
  target: Product,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    price: {
      type: 'decimal',
      nullable: false,
    },
    quantity: {
      type: 'integer',
      nullable: false,
    },
    description: {
      type: 'varchar',
      length: 1000,
      nullable: false,
    },
  },
  relations: {
    figures: {
      target: 'Figure',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    product_types: {
      target: 'ProductType',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    colors: {
      target: 'Color',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    patterns: {
      target: 'Pattern',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    categories: {
      target: 'Category',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
