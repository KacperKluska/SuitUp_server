const { getConnection } = require('typeorm');
const { Product } = require('../models/Product');

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

module.exports = {
  getAllProductsDAO,
};
