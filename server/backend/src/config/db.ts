import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nami');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.log('Standard MongoDB connection failed. Attempting to start in-memory database...');
        try {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            console.log(`In-memory MongoDB started at: ${uri}`);

            const conn = await mongoose.connect(uri);
            console.log(`MongoDB In-Memory Connected: ${conn.connection.host}`);
        } catch (memError: any) {
            console.error(`Error: ${memError.message}`);
            process.exit(1);
        }
    }
};

export default connectDB;
