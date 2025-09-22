import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modals/auth.modal";
import { usersContract } from "../contracts/users";
import { AppRouteImplementation } from "@ts-rest/express";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const signUpController: AppRouteImplementation<
  typeof usersContract.signUp
> = async ({ body }) => {
  const { name, email, password } = body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: 400, body: { message: "User already exists" } };
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  return { status: 201, body: { message: "User created", userId: user._id.toString() } };
};

export const signInController: AppRouteImplementation<
  typeof usersContract.signIn
> = async ({ body }) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) return { status: 401, body: { message: "Invalid credentials" } };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { status: 401, body: { message: "Invalid credentials" } };

  const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { status: 200, body: { message: "Signin successful", token } };
};
