import { changePasswordSchema, requestOtpSchema, resetPasswordSchema, signInSchema, signUpSchema, verifyOtpSchema } from '../../../shared/auth/auth.schema.js';
import { initContract } from "@ts-rest/core";
import { z } from "zod";


const c = initContract();

export const usersContract = c.router({
  // --- Signup
  signUp: {
    method: "POST",
    path: "/auth/user/signUp",
    summary: "Register a new user",
    body: signUpSchema,
    responses: {
      201: z.object({
        message: z.string(),
        userId: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  },

  // --- Signin
  signIn: {
    method: "POST",
    path: "/auth/user/signIn",
    summary: "Login an existing user",
    body: signInSchema,
    responses: {
      200: z.object({
        message: z.string(),
        token: z.string(),
      }),
      401: z.object({
        message: z.string(),
      }),
    },
  },

  // --- Request OTP
  requestOtp: {
    method: "POST",
    path: "/auth/user/request-otp",
    summary: "Request an OTP via email or SMS",
    body: requestOtpSchema,
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
  },

  // --- Verify OTP
  verifyOtp: {
    method: "POST",
    path: "/auth/user/verify-otp",
    summary: "Verify OTP and issue JWT token",
    body: verifyOtpSchema,
    responses: {
      200: z.object({
        message: z.string(),
        token: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  },

  // --- Change Password
  changePassword: {
    method: "POST",
    path: "/auth/user/change-password",
    summary: "Change password (requires old password)",
    body: changePasswordSchema,
    responses: {
      200: z.object({
        message: z.string(),
      }),
      401: z.object({
        message: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  },

  // --- Reset Password
  resetPassword: {
    method: "POST",
    path: "/auth/user/reset-password",
    summary: "Reset password using OTP",
    body: resetPasswordSchema,
    responses: {
      200: z.object({
        message: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  },
});
