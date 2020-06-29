const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  avatar: {
    type: Buffer,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
