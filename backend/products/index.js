require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const routes = require("./src/router/router");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

connectDB();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(
  "/uploads/products",
  express.static(path.join(__dirname, "public", "uploads"))
);

app.all("/", (req, res) => {
  console.log("ROUTING IS WORKING!");
  res.send({
    message: "HELLO WORLD!",
  });
});

app.use("/api", routes);

const PORT = 3001;

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started on port", process.env.PORT || PORT);
});
