import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modals/auth.modal.js";
import { usersContract } from "../contracts/users.js";
import { AppRouteImplementation } from "@ts-rest/express";
import { sendOtpEmail, sendOtpSms } from "../services/otp.service.js";
import Otp from "../modals/otp.modal.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// --- Signup
export const signUpController: AppRouteImplementation<
  typeof usersContract.signUp
> = async ({ body }) => {
  const { fullName, email, password } = body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: 400, body: { message: "User already exists" } };
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, email, password: hashed });

  return { status: 201, body: { message: "User created", userId: user._id.toString() } };
};

// --- Signin
export const signInController: AppRouteImplementation<
  typeof usersContract.signIn
> = async ({ body }) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) return { status: 401, body: { message: "Invalid credentials" } };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { status: 401, body: { message: "Invalid credentials" } };

  const token = jwt.sign({ id: user._id.toString(), role: user?.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { status: 200, body: { message: "Signin successful", token } };
};

// --- Request OTP
export const requestOtpController: AppRouteImplementation<
  typeof usersContract.requestOtp
> = async ({ body }) => {
  const { identifier, channel } = body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.create({
    identifier,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
  });

  if (channel === "email") await sendOtpEmail(identifier, otp);
  if (channel === "sms") await sendOtpSms(identifier, otp);

  return { status: 200, body: { message: "OTP sent successfully" } };
};

// --- Verify OTP
export const verifyOtpController: AppRouteImplementation<
  typeof usersContract.verifyOtp
> = async ({ body }) => {
  const { identifier, otp } = body;

  const record = await Otp.findOne({ identifier, otp });
  if (!record || record.expiresAt < new Date()) {
    return { status: 400, body: { message: "Invalid or expired OTP" } };
  }

  await Otp.deleteOne({ _id: record._id });

  const user = await User.findOne({ email: identifier }) || { id: identifier, role: "guest" };
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

  return { status: 200, body: { message: "OTP verified", token } };
};

// --- Change Password
export const changePasswordController: AppRouteImplementation<
  typeof usersContract.changePassword
> = async ({ body, req }) => {
  const { oldPassword, newPassword } = body;
  const userId = (req as any).user?.id;

  const user = await User.findById(userId);
  if (!user) return { status: 404, body: { message: "User not found" } };

  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) return { status: 401, body: { message: "Invalid old password" } };

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { status: 200, body: { message: "Password changed successfully" } };
};

// --- Reset Password (OTP + new password)
export const resetPasswordController: AppRouteImplementation<
  typeof usersContract.resetPassword
> = async ({ body }) => {
  const { identifier, otp, newPassword } = body;

  const record = await Otp.findOne({ identifier, otp });
  if (!record || record.expiresAt < new Date()) {
    return { status: 400, body: { message: "Invalid or expired OTP" } };
  }

  await Otp.deleteOne({ _id: record._id });

  const user = await User.findOne({ email: identifier });
  if (!user) return { status: 404, body: { message: "User not found" } };

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { status: 200, body: { message: "Password reset successfully" } };
};
