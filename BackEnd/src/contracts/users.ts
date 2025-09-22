import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { signInSchema, signUpSchema } from "../schemas/auth.schema";

const c = initContract();

export const usersContract = c.router({
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
});
