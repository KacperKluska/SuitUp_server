class Opinion {
  constructor(id, rate, comment, product_id) {
    this.id = id;
    this.rate = rate;
    this.comment = comment;
    this.products = product_id;
  }
}

module.exports = { Opinion };
