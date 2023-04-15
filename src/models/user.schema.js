import mongoose from "mongoose";
import AuthRole from "../utils/AuthRole.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxLength: [20, "name can not be more then 20 character long"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password must be required"],
      minLength: [8, "Password must be large then 8 character long"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRole),
      default: AuthRole.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
