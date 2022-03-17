import asyncRedis from 'async-redis';

export const client = asyncRedis.createClient({
    url: process.env.REDIS_URI,
});
