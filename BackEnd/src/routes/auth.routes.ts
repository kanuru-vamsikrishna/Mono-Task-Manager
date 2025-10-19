import { initServer } from "@ts-rest/express";
import { usersContract } from "../contracts/users.js";
import {
  signUpController,
  signInController,
  requestOtpController,
  verifyOtpController,
  changePasswordController,
  resetPasswordController,
} from "../controllers/auth.controller.js";

const s = initServer();

export const usersRouter = s.router(usersContract, {
  signUp: signUpController,
  signIn: signInController,
  requestOtp: requestOtpController,
  verifyOtp: verifyOtpController,
  changePassword: changePasswordController,
  resetPassword: resetPasswordController,
});
