const express = require("express");

const { connectDB } = require("./src/config/db");
const { router } = require("./src/router/router");

const app = express();
const PORT = 3005;
app.use(express.json());
connectDB();
app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
