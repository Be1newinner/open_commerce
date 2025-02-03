import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/users.controller.ts";
import { body } from "express-validator";

const usersRouter = Router();

usersRouter.post("/login", loginController);
usersRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email!"),
    body("fname").notEmpty().withMessage("First name is Rquired!"),
    body("password")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password length must be between 6 to 12 characters."),
    body("role")
      .notEmpty()
      .withMessage("Role is required!")
      .isIn(["ADMIN", "USER", "VENDOR"])
      .withMessage("Invalid role! Allowed values: ADMIN, USER, VENDOR"),
  ],
  registerController
);

export default usersRouter;
