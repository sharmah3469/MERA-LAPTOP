import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User from '../server/backend/src/modules/users/user.model'; // Relative path might need adjust if running from script dir
import Post from '../server/backend/src/modules/posts/post.model';

// Use manual paths or adjustment for ts-node execution
dotenv.config({ path: path.join(__dirname, '../server/backend/.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/nami?authSource=admin');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const seed = async () => {
    await connectDB();

    // Clear existing
    await User.deleteMany({});
    await Post.deleteMany({});

    console.log('Cleared DB');

    const users = await User.create([
        { name: 'Aarav Patel', email: 'aarav@nami.in', phone: '+919876543210', password: 'password123', location: 'Mumbai, MH', bio: 'Love street food and coding' },
        { name: 'Diya Sharma', email: 'diya@nami.in', phone: '+919876543211', password: 'password123', location: 'Delhi, DL', bio: 'Travel & Photography' },
        { name: 'Arjun Reddy', email: 'arjun@nami.in', phone: '+919876543212', password: 'password123', location: 'Bengaluru, KA', bio: 'Tech enthusiast' },
        { name: 'Ananya Das', email: 'ananya@nami.in', phone: '+919876543213', password: 'password123', location: 'Kolkata, WB', bio: 'Artist' }
    ]);

    console.log(`Created ${users.length} users`);

    const posts = await Post.create([
        {
            user: users[0]._id,
            caption: 'Beautiful sunset at Marine Drive today! #Mumbai #Sunset #Vibes',
            mediaUrl: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=60',
            location: { name: 'Marine Drive, Mumbai' },
            hashtags: ['#Mumbai', '#Sunset', '#Vibes'],
            likesCount: 120
        },
        {
            user: users[1]._id,
            caption: 'Exploring Hauz Khas Village. The vibe is unreal. #Delhi #HKV',
            mediaUrl: 'https://images.unsplash.com/photo-1587474260584-136574528615?auto=format&fit=crop&w=800&q=60',
            location: { name: 'Hauz Khas, Delhi' },
            hashtags: ['#Delhi', '#HKV'],
            likesCount: 85
        },
        {
            user: users[2]._id,
            caption: 'Traffic in Silk Board never ends 😅 #Bengaluru #Traffic',
            mediaUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=60',
            location: { name: 'Silk Board, Bengaluru' },
            hashtags: ['#Bengaluru', '#Traffic'],
            likesCount: 200
        }
    ]);

    console.log(`Created ${posts.length} posts`);
    process.exit(0);
};

seed();
