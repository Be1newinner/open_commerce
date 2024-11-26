const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controller/controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login", getUser);

module.exports = router;
