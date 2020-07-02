const express = require("express");
const userRouter = require("./routers/userRouter");
const { json } = require("express");
const config = require("config");
var compression = require("compression");
const productRouter = require("./routers/productRouter");
const path = require("path");

const app = express();

app.use(compression()); //use compression for static items served from server

// Connecting to the database
require("./db/mongoose");

// For outgoing responses and incoming requests
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set Static folder
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
