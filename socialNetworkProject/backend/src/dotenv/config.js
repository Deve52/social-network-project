import dotenv from 'dotenv';
dotenv.config();

export const config={
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
}