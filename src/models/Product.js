const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
  },
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
