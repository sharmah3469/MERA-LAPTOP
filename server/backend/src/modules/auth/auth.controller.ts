import { Request, Response } from 'express';
import User from '../users/user.model';
import { hashPassword, comparePassword } from '../../utils/passwords';
import { generateToken, setTokenCookie } from '../../utils/jwt';
import { generateOTP, verifyOTP } from './otp.service';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [
                { email: email || 'nomatch' },
                { phone: phone || 'nomatch' }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await hashPassword(password);
        }

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        const token = generateToken({ userId: user.id, role: user.role });
        setTokenCookie(res, token);

        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user (select +password because it's excluded by default)
        const user = await User.findOne({ email }).select('+password');
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ userId: user.id, role: user.role });
        setTokenCookie(res, token);

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const requestOTP = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;
        await generateOTP(phone);
        res.json({ message: 'OTP sent successfully (check console logs)' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyOTPAndLogin = async (req: Request, res: Response) => {
    try {
        const { phone, otp } = req.body;
        const isValid = await verifyOTP(phone, otp);

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        let user = await User.findOne({ phone });

        // If user doesn't exist, Create or Require Registration? 
        // Usually OTP login implies auto-registration or just lookup. 
        // Requirement says: "verify OTP and return JWT". 
        // I'll auto-register a simplified user if not found for friction-less onboarding common in India.

        if (!user) {
            user = await User.create({ phone, name: 'User' }); // Placeholder name
        }

        const token = generateToken({ userId: user.id, role: user.role });
        setTokenCookie(res, token);

        res.json({
            token,
            user: {
                id: user.id,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.json({ message: 'Logged out' });
};
