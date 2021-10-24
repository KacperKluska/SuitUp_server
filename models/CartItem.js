class CartItem {
  constructor(id, quantity, cart_id, product_id) {
    this.id = id;
    this.quantity = quantity;
    this.cart_id = cart_id;
    this.product_id = product_id;
  }
}

module.exports = { CartItem };
