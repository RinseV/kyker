# Kyker Backend

## Getting started

### Requirements
* [Yarn](https://yarnpkg.com/) package manager
* [Node.js](https://nodejs.org/en/) > v16.14.2 (LTS) (or [NVM](https://github.com/nvm-sh/nvm))
* [PostgreSQL](https://www.postgresql.org/) database version 14+
* [PostGIS](https://postgis.net/) version 3.2+

### Installation
To install all dependencies run:
```bash
yarn install
```

Then, copy the `.env.example` file, rename it to `.env.development` and fill in the necessary info. Also make sure to create the database with the name used in the `.env.development` file:
```bash
psql postgres

CREATE DATABASE kyker;
```

Make sure you have installed [PostGIS](https://postgis.net/) v3.2+ since the database is using it.

Run the backend using:
```bash
yarn start:dev
```

## Built with
* [NestJS](https://nestjs.com/), as backend framework
* [Fastify](https://www.fastify.io/), for running the web server
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/), for running the GraphQL server
* [Prisma](https://www.prisma.io/), for communicating with the database
* [PostgreSQL](https://www.postgresql.org/), database for persistent data
* [TypeScript](https://www.typescriptlang.org/)
