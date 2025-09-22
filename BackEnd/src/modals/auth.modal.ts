import mongoose, { Document, Schema } from "mongoose";
import { SignUpInput } from "../schemas/auth.schema";


const authSchema = new Schema<SignUpInput>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<SignUpInput>("User", authSchema);
