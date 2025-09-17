import mongoose, { Document, Schema } from "mongoose";
import { SignupInput } from "../schemas/auth.schema";


const userSchema = new Schema<SignupInput>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<SignupInput>("User", userSchema);
