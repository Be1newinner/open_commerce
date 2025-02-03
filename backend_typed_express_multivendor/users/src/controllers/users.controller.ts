import { Request, Response } from "express";
import JSONResponse from "../utils/JsonResponse.ts";
import { validationResult } from "express-validator";
import { UserModel, UserStored } from "../models/user.model.ts";

export function loginController(req: Request, res: Response) {
  res.json(
    JSONResponse({
      message: "Login Sucess!",
    })
  );
  return;
}

export async function registerController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(
      JSONResponse({
        message: errors.array().join(", "),
        status_code: 400,
      })
    );
    return;
  }

  const { email, password, fname, lname, role, phone, gender } = req.body;

  let user = await UserModel.findOne(
    { email },
    {
      _id: 1,
    }
  );

  if (user) {
    res.status(400).json(
      JSONResponse({
        message: "User already exists!",
        status_code: 400,
        data: {
          email,
        },
      })
    );

    return;
  }

  user = new UserModel({
    email,
    password,
    fname,
    lname,
    role,
    phone,
    gender,
  });

  const userData = (await user.save()).toObject() as Partial<UserStored>;
  delete userData.password;

  console.log({ userData });

  res.status(201).json(
    JSONResponse({
      message: "Registration success!",
      status_code: 201,
      data: userData,
    })
  );

  return;
}
