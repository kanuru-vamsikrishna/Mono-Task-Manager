import { z } from "zod";

// Define roles
export const userRoleEnum = z.enum(["admin", "client", "customer"]);

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: userRoleEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
