const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(
  config.get("MONGO_URI"),
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to mongodb database");
  }
);
