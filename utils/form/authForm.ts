import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type AuthSchema = z.infer<typeof authSchema>;
