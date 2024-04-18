import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginFormResolver = zodResolver(loginFormSchema);
export type LoginFormInputs = z.infer<typeof loginFormSchema>;
