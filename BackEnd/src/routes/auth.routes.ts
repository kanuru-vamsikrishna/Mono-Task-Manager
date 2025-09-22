import { initServer } from "@ts-rest/express";
import { usersContract } from "../contracts/users";
import { signUpController, signInController } from "../controllers/auth.controller";

const s = initServer();

export const usersRouter = s.router(usersContract, {
  signUp: signUpController,
  signIn: signInController,
});
