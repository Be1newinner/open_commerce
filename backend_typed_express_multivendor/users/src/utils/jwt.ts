import { sign } from "jsonwebtoken";
import { UserStored } from "../models/user.model.ts";
import CONFIG from "../constants/config.constants.ts";

// Generate JWT Token
export const generateToken = (user: UserStored) => {
  return sign(
    { id: user._id, email: user.email, role: user.role },
    CONFIG.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
