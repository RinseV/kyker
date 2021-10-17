export const __prod__ = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test';
export const __test__ = process.env.NODE_ENV === 'test';
export const COOKIE_NAME = 'id';
export const SESSION_TTL = 1000 * 60 * 60 * 24 * 365; // 1 year
export const ISO_DATE_FORMAT = 'yyyy-MM-dd';
