require("dotenv").config();

const express = require("express");
const { connectDB } = require("./src/config/db");
const { router } = require("./src/router/router");
const cors = require("cors");

const app = express();

const PORT = 3003;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

connectDB();

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
