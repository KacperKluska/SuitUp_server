class CartItem {
  constructor(id, quantity, cart_id, product_id) {
    this.id = id;
    this.quantity = quantity;
    this.carts = cart_id;
    this.products = product_id;
  }
}

module.exports = { CartItem };
