import { z } from "zod";

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signupSchema = z
    .object({
        email: z
            .string()
            .min(1, "Eamil is required")
            // .email()
            .regex(emailRegex, "Invalid email address"),

        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and _"),


        password: z
            .string()
            .min(1, "Password is required")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                "Password must include uppercase, lowercase, number and special character"
            ),
        confirmPassword: z
            .string()
            .min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type SignupFormValues = z.infer<typeof signupSchema>;



export const loginSchema = z.object({
    identifier: z
        .string()
        .min(1, "Email or username is required"),

    password: z
        .string()
        .min(1, "Password is required")
});

export type SigninFormValues = z.infer<typeof loginSchema>;