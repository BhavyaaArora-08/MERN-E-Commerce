const express = require("express");
const userRouter = require("./routers/userRouter");
const { json } = require("express");
const config = require("config");

const app = express();

// Connecting to the database
require("./db/mongoose");

// Routers
app.use("/api/users", userRouter);

// For outgoing responses and incoming requests
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
