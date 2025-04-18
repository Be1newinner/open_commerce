import { model, Schema } from "mongoose";
import { hashing } from "../utils/hashing.ts";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 12,
    },
  },
  {
    autoIndex: true,
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hashing(this.password as string);
  next();
});

const UserModel = model("User", UserSchema);

export { UserModel };
