import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
    password: z.string().min(6).optional(),
}).refine(data => data.email || data.phone, {
    message: "Either email or phone must be provided",
    path: ["email"]
});

export const loginSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
    password: z.string().min(6).optional(),
}).refine(data => (data.email || data.phone) && data.password, {
    message: "Email/Phone and Password required for standard login",
});

export const otpRequestSchema = z.object({
    phone: z.string().min(10),
});

export const otpVerifySchema = z.object({
    phone: z.string().min(10),
    otp: z.string().length(6),
});
