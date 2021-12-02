const {
  getAllProductsDAO,
  getPatternsDAO,
  getProductTypesDAO,
  getFiguresDAO,
  getColorsDAO,
  getCategoriesDAO,
} = require('../dao/ProductDao');

async function getAllProducts() {
  try {
    const result = await getAllProductsDAO();
    return result.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        description: item.description,
        product_type: item.product_types.type,
        figure: item.figures.figure,
        color: item.colors.color,
        pattern: item.patterns.pattern,
        category: item.categories.category,
      };
    });
  } catch (err) {
    console.error(err);
  }
}

async function getAllProductsFilters() {
  try {
    return [
      { name: 'patterns', array: await getPatternsDAO() },
      { name: 'colors', array: await getColorsDAO() },
      { name: 'figures', array: await getFiguresDAO() },
      { name: 'product_types', array: await getProductTypesDAO() },
      { name: 'categories', array: await getCategoriesDAO() },
    ];
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllProducts,
  getAllProductsFilters,
};
