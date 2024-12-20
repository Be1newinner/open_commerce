require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const routes = require("./router/router");
const cors = require("cors");

const PORT = 3006;
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));
connectDB();
app.use("/api", routes);

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started on port", process.env.PORT || PORT);
});