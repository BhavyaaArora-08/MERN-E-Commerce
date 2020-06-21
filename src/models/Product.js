const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  avatar: {
    type: Buffer,
  },
});

const Product = mongoose.Model("Product", productSchema);

module.exports = Product;
