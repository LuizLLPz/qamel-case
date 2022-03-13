import asyncRedis from 'async-redis';
import { config } from "dotenv-safe";

config();

export const client = asyncRedis.createClient({
    host: process.env.REDIS_HOST,
});