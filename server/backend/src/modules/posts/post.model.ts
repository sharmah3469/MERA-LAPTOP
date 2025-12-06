import mongoose, { Schema } from 'mongoose';

export interface IPost extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    caption: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    thumbnailUrl?: string; // For videos
    location?: {
        name: string;
        coordinates?: [number, number]; // GeoJSON [long, lat]
    };
    hashtags: string[];
    likesCount: number;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    caption: { type: String, trim: true, maxlength: 2200 },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    thumbnailUrl: { type: String },
    location: {
        name: { type: String },
        coordinates: { type: [Number], index: '2dsphere' }
    },
    hashtags: [{ type: String, index: true }],
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

// Indexes
postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
