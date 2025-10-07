import { z } from "zod";

// --- Signup (for password-based signup)
export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- Signin (password flow)
export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- OTP Request (send OTP via email or SMS)
export const requestOtpSchema = z.object({
  identifier: z.string().min(5, "Email or phone number is required"),
  channel: z.enum(["email", "sms"]),
});

// --- OTP Verification
export const verifyOtpSchema = z.object({
  identifier: z.string().min(5),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// --- Change Password
export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

// --- Reset Password (OTP + new password)
export const resetPasswordSchema = z.object({
  identifier: z.string(),
  otp: z.string().length(6),
  newPassword: z.string().min(6),
});

// --- Types
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
