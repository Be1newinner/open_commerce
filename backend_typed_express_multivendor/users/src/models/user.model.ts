import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import CONFIG from "../constants/config.constants.ts";

export enum USER_ROLES {
  USER = "USER",
  VENDOR = "VENDOR",
  ADMIN = "ADMIN",
}

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export type UserBase = {
  email: string;
  fname: string;
  lname: string;
  role: USER_ROLES;
  phone: string;
  gender: GENDER;
};

export interface UserStored extends UserBase {
  password: string;
  _id: string;
}

export type UserForLoginType = {
  email: string;
  password: string;
};

export type UserFromToken = {
  email: string;
  role: USER_ROLES;
};

const UserSchema = new Schema<UserStored & Document>(
  {
    email: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    role: { type: String, enum: Object.values(USER_ROLES), required: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, enum: Object.values(GENDER), required: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserStored & Document>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(CONFIG.JWT_SECRET, salt);
  console.log({ hashedPassword: this.password });
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<UserStored>("UserSchema", UserSchema);
