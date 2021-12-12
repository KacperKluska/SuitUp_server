class Product {
  constructor(
    id,
    name,
    price,
    quantity,
    description,
    product_type_id,
    figure_id,
    color_id,
    pattern_id,
    category_id,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.product_types = product_type_id;
    this.figures = figure_id;
    this.colors = color_id;
    this.patterns = pattern_id;
    this.categories = category_id;
  }
}

module.exports = { Product };
