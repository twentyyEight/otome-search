import dotenv from 'dotenv';

dotenv.config();

if (!process.env.TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined');
}

export const TOKEN_SECRET = process.env.TOKEN_SECRET