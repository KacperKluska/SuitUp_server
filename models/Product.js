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
    pattern_id
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.product_type_id = product_type_id;
    this.figure_id = figure_id;
    this.color_id = color_id;
    this.pattern_id = pattern_id;
  }
}

module.exports = { Product };
