import { Request, Response } from "express";
import { UserModel } from "../models/users.model.ts";
import { verifyHash } from "../utils/hashing.ts";
import { generateLoginTokens } from "../utils/jwt.ts";

// interface AuthenticatedUser {
//   _id: string;
//   email: string;
//   name: string;
//   gender: string;
//   role: string;
//   phone: string;
//   password?: string; // Optional because we remove it before sending
// }

async function loginController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      email,
    }).lean();

    if (!user) {
      res.status(404).json({
        error: "No User Found!",
        message: "User Login Failed!",
        data: null,
      });
      return;
    }

    const isPasswordValid = await verifyHash(password, user.password!);

    if (!isPasswordValid) {
      res.status(401).json({
        error: "Invalid credentials",
        message: "Invalid email or password!",
        data: null,
      });
      return;
    }

    console.log({ user });

    const { _id, role } = user;
    const { accessToken, refreshToken } = await generateLoginTokens({
      uid: String(_id),
      email,
      role,
    });

    // const { password: _, ...userWithoutPassword } = user;
    delete user.password;

    res.status(200).json({
      error: null,
      message: "User logged in successfully!",
      data: {
        ...user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("ERROR =>", error);
    res.status(500).json({
      message: (error as Error).message || "Unexpected error!",
      data: null,
    });
  }
}

async function registerController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name, gender, role, phone } = req.body;

    const userData = new UserModel({
      email,
      password,
      name,
      gender,
      role,
      phone,
    });

    const user = await userData.save();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    if (user) {
      res.status(200).json({
        error: null,
        message: "User registered successfully!",
        data: userWithoutPassword,
      });
    } else {
      res.status(404).json({
        error: "No User Found!",
        message: "User registration failed!",
        data: null,
      });
    }
  } catch (error) {
    console.error("ERROR =>", error);
    res.status(500).json({
      message: (error as Error).message || "Unexpected error!",
      data: null,
    });
  }
}

export { loginController, registerController };
