import asyncRedis from 'async-redis';
import { config } from "dotenv-safe";

config();

export const client = asyncRedis.createClient({
    url: process.env.REDIS_URI,
});