import express from 'express';
import { login, register, requestOTP, verifyOTPAndLogin, logout } from './auth.controller';
import { z } from 'zod';

const router = express.Router();

const validate = (schema: z.ZodSchema) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error: any) {
        return res.status(400).json({ errors: error.errors });
    }
};

import { registerSchema, loginSchema, otpRequestSchema, otpVerifySchema } from '../../utils/validators';

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/otp/request', validate(otpRequestSchema), requestOTP);
router.post('/otp/verify', validate(otpVerifySchema), verifyOTPAndLogin);
router.post('/logout', logout);

export default router;
