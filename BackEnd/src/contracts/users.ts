// src/contracts/users.ts
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const usersContract = c.router({
  signup: {
    method: "POST",
    path: "/signup",
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }),
    responses: {
      201: z.object({ message: z.string(), userId: z.string() }),
      400: z.object({ message: z.string() }),
    },
    summary: "Register a new user",
  },
  signin: {
    method: "POST",
    path: "/signin",
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    responses: {
      200: z.object({ message: z.string(), token: z.string() }),
      401: z.object({ message: z.string() }),
    },
    summary: "Login an existing user",
  },
});
