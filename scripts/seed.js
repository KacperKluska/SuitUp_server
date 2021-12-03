/* eslint-disable no-await-in-loop */
const { createConnection } = require('typeorm');
const faker = require('faker');
const config = require('../ormconfig');
const { Product } = require('../models/Product');
const { Pattern } = require('../models/Pattern');
const { Color } = require('../models/Color');
const { Figure } = require('../models/Figure');
const { ProductType } = require('../models/ProductType');
const { Category } = require('../models/Category');

async function getAllProductsDAO() {
  const connection = await createConnection(config);
  const productRepository = await connection.getRepository(Product);
  const patternRepository = await connection.getRepository(Pattern);
  const colorRepository = await connection.getRepository(Color);
  const figureRepository = await connection.getRepository(Figure);
  const productTypeRepository = await connection.getRepository(ProductType);
  const categoryRepository = await connection.getRepository(Category);

  const patterns = await patternRepository.find();
  const colors = await colorRepository.find();
  const figures = await figureRepository.find();
  const productTypes = await productTypeRepository.find();
  const categories = await categoryRepository.find();

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 20; i++) {
    const val = await productRepository.create({
      name: `Product ${i}`,
      price: faker.datatype.number(100),
      quantity: faker.datatype.number(10),
      description: 'Elo',
      product_types: faker.random.arrayElement(productTypes).id,
      figures: faker.random.arrayElement(figures).id,
      colors: faker.random.arrayElement(colors).id,
      patterns: faker.random.arrayElement(patterns).id,
      categories: faker.random.arrayElement(categories).id,
    });
    await productRepository.save(val);
  }
}

getAllProductsDAO();
