import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  company_id: z.string().min(1, "Company is required"),
  role_id: z.string().min(1, "Role is required"),
});
