import asyncRedis from 'async-redis';

export const client = asyncRedis.createClient();