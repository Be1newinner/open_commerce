require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const routes = require("./router/router");

const PORT = 3002;
const app = express();
app.use(express.json());
connectDB();
app.use("/api", routes);

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started on port", process.env.PORT || PORT);
});