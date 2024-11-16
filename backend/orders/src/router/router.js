const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controller/controller");
const router = express.Router();

router.post("/", registerUser);
router.post("/", loginUser);

module.exports = router;
