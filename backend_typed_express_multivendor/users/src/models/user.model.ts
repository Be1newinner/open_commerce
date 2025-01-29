import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: String,
});

export const UserModel = model("UserSchema", UserSchema);
