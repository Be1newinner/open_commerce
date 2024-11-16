require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const routes = require("./src/router/router");
const cors = require("cors");
const app = express();
connectDB();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api", routes);

<<<<<<< Updated upstream
const PORT = 3002;
const app = express();
app.use(express.json());
connectDB();
app.use("/api", routes);
=======
const PORT = 3001;
>>>>>>> Stashed changes

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started on port", process.env.PORT || PORT);
});
