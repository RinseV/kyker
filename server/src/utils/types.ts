import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Session } from '@mgcrea/fastify-session';
import { Redis } from 'ioredis';

export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>;
    req: FastifyRequest;
    res: FastifyReply;
    redis: Redis;
};

declare module 'fastify' {
    interface FastifyRequest {
        session: Session;
    }
}

declare module '@mgcrea/fastify-session' {
    interface SessionData {
        id: string;
    }
}
