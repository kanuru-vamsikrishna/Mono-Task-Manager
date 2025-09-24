import mongoose, { Schema, Document, Types } from "mongoose";

// This should match your full user shape (not just SignUpInput)
export interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "client" | "customer";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "client", "customer"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
