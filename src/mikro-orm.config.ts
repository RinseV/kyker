import { IDatabaseDriver, Options } from '@mikro-orm/core';
import path from 'path';
import { __prod__ } from './constants';
import { Animal, Location, Spotting, User } from './entities';

const config: Options<IDatabaseDriver> = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [User, Spotting, Location, Animal],
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: 'postgresql',
    debug: !__prod__
};

export default config;
