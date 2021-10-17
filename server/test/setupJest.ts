jest.setTimeout(60000);
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'kruger-test';
process.env.DB_USER = 'postgres';
process.env.DB_PASSWORD = 'postgres';
process.env.PORT = '4001';
process.env.REDIS_URL = '127.0.0.1:6379';
process.env.SESSION_SECRET = 'testing_secret';
process.env.CORS_ORIGIN = 'http://localhost:3000';
