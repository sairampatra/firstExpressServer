import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Import bcrypt

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      minLength: 2,
      maxLength: 50,
      unique: true,
      validate: {
        validator: function (val) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
        },
        message: "invalid email format",
      },
    },
    password: {
      type: String,
      minLength: 2,
      maxLength: 50,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function modifyPassword(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashedPassword;
  next();
});
export const User = mongoose.model("User", userSchema);
