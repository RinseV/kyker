# Kyker Frontend

## Getting started

### Requirements
* [Yarn](https://yarnpkg.com/) package manager
* [Node.js](https://nodejs.org/en/) > v14.17.5 (LTS) (or [NVM](https://github.com/nvm-sh/nvm))

### Installation
To install all dependencies, run:
```bash
yarn install
```

Then, copy the `.env.example` file, rename it to `.env.local` and add your Mapbox API key.

Run the frontend using:
```bash
yarn dev
```

To build for production, use:
```bash
yarn build
```

## Built with
* [Create React App](https://create-react-app.dev/docs/making-a-progressive-web-app/), for the template
* [Chakra UI](https://chakra-ui.com/), React component library
* [React](https://reactjs.org/), UI library
* [Apollo Client](https://www.apollographql.com/docs/react/), for communicating with the backend GraphQL API
* [TypeScript](https://www.typescriptlang.org/)



