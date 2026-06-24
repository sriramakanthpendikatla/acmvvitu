import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  rollNumber: z.string().min(3, "Roll number is required"),
  branch: z.string().min(1, "Select a branch"),
  email: z.string().email("Valid email required"),
  eventId: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
