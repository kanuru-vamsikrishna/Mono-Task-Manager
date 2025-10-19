
import { z } from "zod";
import { requestOtpSchema } from "@shared/auth/auth.schema";
import mongoose, { Schema, Document } from "mongoose";
export type RequestOtpInput = z.infer<typeof requestOtpSchema>;

export interface OtpDocument extends RequestOtpInput, Document {
  otp: string; // explicitly stored OTP
  expiresAt: Date;
}

const otpSchema = new Schema<OtpDocument>(
  {
    identifier: { type: String, required: true },
    channel: { type: String, enum: ["email", "sms"], required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<OtpDocument>("Otp", otpSchema);
