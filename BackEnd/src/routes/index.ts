import { initServer } from "@ts-rest/express";
import { apiContract } from "../contracts/index.js";
import { usersRouter } from "./auth.routes.js";

const s = initServer();

export const appRouter = s.router(apiContract, {
  users: usersRouter,
});
