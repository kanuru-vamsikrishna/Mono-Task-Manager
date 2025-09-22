import { initServer } from "@ts-rest/express";
import { apiContract } from "../contracts";
import { usersRouter } from "./auth.routes";

const s = initServer();

export const appRouter = s.router(apiContract, {
  users: usersRouter,
});
