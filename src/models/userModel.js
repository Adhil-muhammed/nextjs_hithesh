import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Why no bacon?"],
  },
  lastName: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
