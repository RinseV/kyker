# Kyker Backend

## Getting started

### Requirements
* [Yarn](https://yarnpkg.com/) package manager
* [Node.js](https://nodejs.org/en/) > v14.17.5 (LTS) (or [NVM](https://github.com/nvm-sh/nvm))
* [PostgreSQL](https://www.postgresql.org/) database version 12+
* [Redis](https://redis.io/) in-memory database

### Installation
To install all dependencies run:
```bash
yarn install
```

Then, copy the `.env.example` file, rename it to `.env.local` and fill in the necessary info. Also make sure to create the database with the name used in the `.env.local` file:
```bash
psql postgres

CREATE DATABASE kyker;
```

Run the backend using:
```bash
yarn dev
```

## Built with
* [Fastify](https://www.fastify.io/), for running the web server
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/), for running the GraphQL server
* [TypeGraphQL](https://typegraphql.com/), for strictly typing the GraphQL objects
* [MikroORM](https://mikro-orm.io/), for communicating with the database
* [PostgreSQL](https://www.postgresql.org/), database for persistent data
* [Redis](https://redis.io/), in-memory database for temporary storage
* [TypeScript](https://www.typescriptlang.org/)