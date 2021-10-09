/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-fastify';
import Fastify, { FastifyInstance } from 'fastify';
import { buildSchema } from 'type-graphql';
import RedisStore from '@mgcrea/fastify-session-redis-store';
import Redis from 'ioredis';
import fastifyCors from 'fastify-cors';
import fastifySession from '@mgcrea/fastify-session';
import fastifyCookie from 'fastify-cookie';
import mikroConfig from './mikro-orm.config';
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginDrainHttpServer
} from 'apollo-server-core';
import { Server } from 'http';
import { COOKIE_NAME, SESSION_TTL, __prod__ } from './constants';
import { PinResolver } from './resolvers/pin.resolver';
import { UserResolver } from './resolvers/user.resolver';

function fastifyAppClosePlugin(app: FastifyInstance) {
    return {
        async serverWillStart() {
            return {
                async drainServer() {
                    await app.close();
                }
            };
        }
    };
}

export default class Application {
    public orm: MikroORM<IDatabaseDriver<Connection>>;
    public host: FastifyInstance;
    public redis: Redis.Redis;
    public apolloServer: ApolloServer;
    public server: Server;

    public connect = async (): Promise<void> => {
        try {
            // Connect to DB and run migrations (if needed)
            this.orm = await MikroORM.init(mikroConfig);
            const migrator = this.orm.getMigrator();
            const migrations = await migrator.getPendingMigrations();
            if (migrations && migrations.length > 0) {
                await migrator.up();
            }
        } catch (error) {
            console.error('Could not connect to database', error);
            process.exit(1);
        }
    };

    public init = async (): Promise<void> => {
        // Init redis
        this.redis = new Redis(process.env.REDIS_URL!);

        // Init fastify server, logging is disabled but can be enabled
        this.host = Fastify({
            logger: false
        });

        // CORS
        this.host.register(fastifyCors, {
            origin: process.env.CORS_ORIGIN!,
            credentials: true
        });

        // Needed for session
        this.host.register(fastifyCookie);

        // Session
        this.host.register(fastifySession, {
            secret: process.env.SESSION_SECRET!,
            cookie: {
                maxAge: SESSION_TTL,
                httpOnly: true,
                secure: __prod__,
                sameSite: 'lax'
            },
            cookieName: COOKIE_NAME,
            // Don't immediately set cookie
            saveUninitialized: false,
            store: new RedisStore({
                client: this.redis,
                ttl: SESSION_TTL
            })
        });

        try {
            // Init Apollo server
            this.apolloServer = new ApolloServer({
                schema: await buildSchema({
                    resolvers: [UserResolver, PinResolver],
                    validate: true,
                    dateScalarMode: 'timestamp'
                }),
                context: ({ request, response }) => ({
                    em: this.orm.em.fork(),
                    req: request,
                    res: response,
                    redis: this.redis
                }),
                // Enable playground and fastify support
                plugins: [
                    __prod__
                        ? ApolloServerPluginLandingPageDisabled
                        : ApolloServerPluginLandingPageGraphQLPlayground({
                              settings: {
                                  'request.credentials': 'include'
                              }
                          }),
                    fastifyAppClosePlugin(this.host),
                    ApolloServerPluginDrainHttpServer({ httpServer: this.host.server })
                ]
            });

            await this.apolloServer.start();

            this.host.register(this.apolloServer.createHandler({ cors: false }));

            try {
                await this.host.listen(process.env.PORT!);
                console.log(`🚀 Server ready at ${process.env.PORT!}`);
            } catch (error) {
                this.host.log.error(error);
                process.exit(1);
            }
        } catch (error) {
            console.error('Could not start server', error);
        }
    };
}
