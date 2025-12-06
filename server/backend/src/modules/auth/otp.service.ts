// In a real app, integrate with Twilio/MSG91/SNS
// For local dev, we log the OTP and return it in dev mode if needed, or just standard 123456

const OTP_STORE = new Map<string, { otp: string; expires: number }>();

export const generateOTP = async (phone: string): Promise<string> => {
    const otp = '123456'; // Fixed mock OTP for simplicity or random: Math.floor(100000 + Math.random() * 900000).toString();

    // Store with 5 min expiration
    OTP_STORE.set(phone, {
        otp,
        expires: Date.now() + 5 * 60 * 1000
    });

    console.log(`[MOCK OTP] Generated for ${phone}: ${otp}`);
    return otp;
};

export const verifyOTP = async (phone: string, inputOtp: string): Promise<boolean> => {
    const data = OTP_STORE.get(phone);
    if (!data) return false;
    if (Date.now() > data.expires) {
        OTP_STORE.delete(phone);
        return false;
    }
    if (data.otp === inputOtp) {
        OTP_STORE.delete(phone);
        return true;
    }
    return false;
};
