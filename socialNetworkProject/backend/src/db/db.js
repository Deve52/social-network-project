import mongoose from 'mongoose';
import { config } from '../dotenv/config.js';

export const connectDB = async()=>{
    mongoose.connect(config.MONGO_DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}