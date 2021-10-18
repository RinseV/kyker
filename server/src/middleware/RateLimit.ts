import { ResolverData, UseMiddleware } from 'type-graphql';
import { MyContext } from '../utils/types';
import { createHash } from 'crypto';
import { format } from 'date-fns';
import { ISO_DATE_FORMAT } from '../constants';

/**
 * Middleware to rate limit requests
 * @param window The window in which the requests are counted (in seconds) (default 10s)
 * @param max The maximum number of requests allowed in the window (default 10)
 * @param errorMessage The error message to return if the request is over the limit
 * @returns The middleware
 */
export default function RateLimit(window = 10, max = 10, errorMessage = 'Too many requests') {
    return UseMiddleware(async ({ info: { fieldName }, context: { req, redis } }: ResolverData<MyContext>, next) => {
        // Don't limit if the request is from a test
        if (process.env.NODE_ENV === 'test') {
            return next();
        }
        // Get IP from request
        const visitorKey = 'date:' + format(new Date(), ISO_DATE_FORMAT) + ':ip:' + req.ip;
        // Hash for GDPR compliance
        const hashedKey = createHash('sha256').update(visitorKey).digest('hex');
        const key: string = ['limit', fieldName, hashedKey].join(':');
        // Get record from redis
        // TODO: race conditions with transactions???
        const oldRecord = await redis.get(key);
        if (oldRecord) {
            // If we are over the max, return error
            if (parseInt(oldRecord) > max) {
                throw new Error(errorMessage);
            } else {
                // Otherwise, increment the record and set it back in redis
                await redis.incr(key);
            }
        } else {
            // If there is no record, set it to 1 and set it back in redis
            await redis.set(key, '1', 'EX', window);
        }
        return next();
    });
}
