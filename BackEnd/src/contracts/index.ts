import { initContract } from "@ts-rest/core";
import { usersContract } from "./users";

const c = initContract();

export const apiContract = c.router({
  users: usersContract,
});
