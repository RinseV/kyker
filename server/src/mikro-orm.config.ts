import { IDatabaseDriver, Options } from '@mikro-orm/core';
import path from 'path';
import { __prod__ } from './constants';
import { Animal, Camp, Color, Gate, Location, Spotting, User } from './entities';

const config: Options<IDatabaseDriver> = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [User, Spotting, Location, Animal, Color, Camp, Gate],
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    type: 'postgresql',
    debug: !__prod__,
    // Required for using mikro-orm database:import command
    multipleStatements: true
};

export default config;
