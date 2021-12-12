const { getConnection } = require('typeorm');
const { Product } = require('../models/Product');
const { Pattern } = require('../models/Pattern');
const { Color } = require('../models/Color');
const { Figure } = require('../models/Figure');
const { ProductType } = require('../models/ProductType');
const { Category } = require('../models/Category');

async function getAllProductsDAO() {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  const products = await productRepository.find({
    join: {
      alias: 'product',
      leftJoinAndSelect: {
        figure: 'product.figures',
        pattern: 'product.patterns',
        color: 'product.colors',
        product_type: 'product.product_types',
        category: 'product.categories',
      },
    },
  });
  return products;
}

async function getPatternsDAO() {
  const connection = getConnection();
  const repository = connection.getRepository(Pattern);
  const result = await repository.find({ order: { id: 'ASC' } });
  return result.map((item) => {
    return { id: item.id, value: item.pattern };
  });
}

async function getColorsDAO() {
  const connection = getConnection();
  const repository = connection.getRepository(Color);
  const result = await repository.find({ order: { id: 'ASC' } });
  return result.map((item) => {
    return { id: item.id, value: item.color };
  });
}

async function getFiguresDAO() {
  const connection = getConnection();
  const repository = connection.getRepository(Figure);
  const result = await repository.find({ order: { id: 'ASC' } });
  return result.map((item) => {
    return { id: item.id, value: item.figure };
  });
}

async function getProductTypesDAO() {
  const connection = getConnection();
  const repository = connection.getRepository(ProductType);
  const result = await repository.find({ order: { id: 'ASC' } });
  return result.map((item) => {
    return { id: item.id, value: item.type };
  });
}

async function getCategoriesDAO() {
  const connection = getConnection();
  const repository = connection.getRepository(Category);
  const result = await repository.find({ order: { id: 'ASC' } });
  return result.map((item) => {
    return { id: item.id, value: item.category };
  });
}

module.exports = {
  getAllProductsDAO,
  getPatternsDAO,
  getColorsDAO,
  getFiguresDAO,
  getProductTypesDAO,
  getCategoriesDAO,
};
