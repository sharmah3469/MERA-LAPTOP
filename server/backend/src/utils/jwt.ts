import jwt from 'jsonwebtoken';
import { Response } from 'express';

interface TokenPayload {
    userId: string;
    role: string;
}

export const generateToken = (payload: TokenPayload): string => {
    const options: jwt.SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
    };
    return jwt.sign({ ...payload }, process.env.JWT_SECRET as string, options);
};

export const setTokenCookie = (res: Response, token: string) => {
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};
