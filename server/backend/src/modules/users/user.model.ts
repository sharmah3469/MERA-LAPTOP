import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    avatar?: string;
    bio?: string;
    location?: string;
    language?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, sparse: true, trim: true },
    password: { type: String, select: false },
    avatar: { type: String },
    bio: { type: String, maxlength: 160 },
    location: { type: String },
    language: { type: String, default: 'en' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
    timestamps: true
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
