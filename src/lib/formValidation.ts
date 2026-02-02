import { z } from "zod";

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z
    .string()
    .trim()
    .max(100, "Company must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(30, "Phone must be less than 30 characters")
    .regex(/^[\d\s\-\+\(\)\.]*$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters"),
});

// Apply form validation schema
export const applyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .max(30, "Phone must be less than 30 characters")
    .regex(/^[\d\s\-\+\(\)\.]+$/, "Invalid phone number format"),
  position: z
    .string()
    .trim()
    .min(1, "Please select a position"),
  experience: z
    .string()
    .trim()
    .min(1, "Please select your experience level"),
  linkedin: z
    .string()
    .trim()
    .max(200, "LinkedIn URL must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  about: z
    .string()
    .trim()
    .min(1, "Please tell us about yourself")
    .max(2000, "About section must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ApplyFormData = z.infer<typeof applyFormSchema>;
