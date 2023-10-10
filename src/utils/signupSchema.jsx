import { z } from "zod";

export const signUpSchema = z
    .object({
        first_name: z.string().min(2, {
            message: "First name must have at least 2 characters",
        }),
        last_name: z
            .string()
            .min(2, { message: "Last name must have at least 2 characters" }),
        // username: z.string().min(4, "Username should have at least 4 characters"),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Password should be at least 8 characters" }),
        confirm_password: z
            .string()
            .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: "Password don't match",
    });
