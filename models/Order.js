class Order {
  constructor(id, filling_date, provide_date, price, product_id, user_id) {
    this.id = id;
    this.filling_date = filling_date;
    this.provide_date = provide_date;
    this.price = price;
    this.products = product_id;
    this.users = user_id;
  }
}

module.exports = { Order };
