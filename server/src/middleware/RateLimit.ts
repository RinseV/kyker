import { getUnixTime } from 'date-fns';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ResolverData, UseMiddleware } from 'type-graphql';
import { MyContext } from '../utils/types';

const SCRIPT = readFileSync(resolve(__dirname, '../scripts/request_rate_limiter.lua'), {
    encoding: 'utf8'
});

/**
 * Middleware to rate limit requests using a token bucket algorithm
 *
 * For each IP, there is a bucket of tokens with a max capacity 50 (by default),
 * the tokens are refilled at a rate of 10 (by default) tokens per second.
 * A user is allowed to make requests as long as the bucket is not empty.
 *
 * @param replenishRate Amount of tokens to replenish per second (default 10)
 * @param capacity Total bucket capacity (default 50)
 * @param errorMessage The error message to return if the request is over the limit
 * @returns The middleware
 */
export default function RateLimit(replenishRate = 10, capacity = 50, errorMessage = 'Too many requests') {
    return UseMiddleware(async ({ context: { req, redis } }: ResolverData<MyContext>, next) => {
        // Don't limit if the request is from a test
        if (process.env.NODE_ENV === 'test') {
            return next();
        }
        const prefix = `rateLimit:${req.ip}`;
        const keys = [prefix + ':tokens', prefix + ':timestamp'];
        const args = [replenishRate, capacity, getUnixTime(new Date()), 1];

        // Check whether the request is over the limit
        const [allowed] = await redis.eval(SCRIPT, 2, keys, args);
        if (!allowed) {
            throw new Error(errorMessage);
        }
        return next();
    });
}
