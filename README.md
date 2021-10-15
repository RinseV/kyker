# Kruger Spotter

## Front-end

For the `web` folder:

### Installation

Install all dependencies by running

```bash
yarn install
```

Copy `.env.example`, rename it to `.env.local` and add a Mapbox API key

Run using

```bash
yarn start
```

## Back-end

### Installation

Install all dependencies by running

```bash
yarn install
```

Copy the `.env.example`, rename it to `.env.local` and add the necessary info. Make sure to also create the database in postgres using

```bash
psql postgres

CREATE DATABASE kruger;
```

Once installed, you can start the server in dev mode by running

```bash
yarn dev
```
