import mongoose, { Schema, Document } from "mongoose";
import { requestOtpSchema } from "../schemas/auth.schema";

// ✅ Infer TypeScript type from Zod schema
export type RequestOtpInput = typeof requestOtpSchema._type;

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
