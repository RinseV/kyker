import { ResolverData, UseMiddleware } from 'type-graphql';
import { MyContext } from '../utils/types';

/**
 * Middleware to rate limit requests
 * @param window The window in which the requests are counted (in seconds) (default 10s)
 * @param max The maximum number of requests allowed in the window (default 10)
 * @param limitByVariables If it should be limited by the variables in the request (default false)
 * @param errorMessage The error message to return if the request is over the limit
 * @returns The middleware
 */
export default function RateLimit(window = 10, max = 10, limitByVariables = false, errorMessage = 'Too many requests') {
    return UseMiddleware(
        async ({ info: { variableValues, fieldName }, context: { req, redis } }: ResolverData<MyContext>, next) => {
            // Don't limit if the request is from a test
            if (process.env.NODE_ENV === 'test') {
                return next();
            }
            // Get IP from request
            const visitorKey = 'ip:' + req.ip;
            const variableKey =
                limitByVariables &&
                JSON.stringify(variableValues)
                    .replace(/[^a-zA-Z0-9,]/g, '')
                    .trim();
            const key: string = ['limit', fieldName, variableKey, visitorKey].join(':');
            // Get record from redis
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
        }
    );
}
