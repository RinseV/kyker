import { IDatabaseDriver, Options } from '@mikro-orm/core';
import path from 'path';
import { __prod__ } from './constants';
import { Location, Pin, User } from './entities';

const config: Options<IDatabaseDriver> = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [User, Pin, Location],
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: 'postgresql',
    debug: !__prod__
};

export default config;
