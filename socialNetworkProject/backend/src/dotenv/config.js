import dotenv from 'dotenv';
dotenv.config();

export const config={
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY
}