import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email is too long"),

  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(
      /^[+\d\s()-]+$/,
      "Phone can only contain numbers, +, spaces, and dashes",
    ),

  objective: z
    .string()
    .min(3, "Objective must be at least 3 characters")
    .max(100, "Objective is too long"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});
