const { getAllProducts } = require('../services/ProductService');

module.exports = function (app) {
  app.get('/products', async (req, res) => {
    try {
      const products = await getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
    }
  });
};
