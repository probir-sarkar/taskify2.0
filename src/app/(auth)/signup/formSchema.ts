import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export const signupFormSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).max(32),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signupFormResolver = zodResolver(signupFormSchema);
export type SignupFormInputs = z.infer<typeof signupFormSchema>;
