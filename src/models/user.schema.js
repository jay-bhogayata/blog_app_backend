import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import AuthRole from "../utils/AuthRole.js";
import config from "../config/index.js";

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

// hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  // compare user entered password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  //generate json web token
  generateJwt: function () {
    return jwt.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  },

  // generating forgot password token
  generateForgotPasswordToken: function () {
    const token = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
  },
};

export default mongoose.model("User", userSchema);
