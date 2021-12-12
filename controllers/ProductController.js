const {
  getAllProducts,
  getAllProductsFilters,
} = require('../services/ProductService');

module.exports = function (app) {
  app.get('/products', async (req, res) => {
    try {
      const products = await getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
    }
  });

  app.get('/products/filters', async (req, res) => {
    try {
      res.status(200).json(await getAllProductsFilters());
    } catch (err) {
      res.status(400).send({ error: 'There was a server error' });
    }
  });
};
