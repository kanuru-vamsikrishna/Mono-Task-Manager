// routes/auth.routes.ts
import { initServer } from "@ts-rest/express";
import { usersContract } from "../contracts/users";
import { signupController, signinController } from "../controllers/auth.controller";
import express from "express";

const s = initServer();

export const usersRouter = s.router(usersContract, {
  signup: signupController,
  signin: signinController,
}) as unknown as express.Router; // ✅ cast to Router
