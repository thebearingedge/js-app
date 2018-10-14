js-app
--

A full stack JavaScript project scaffold.

[![Build Status](https://travis-ci.org/thebearingedge/js-app.svg?branch=master)](https://travis-ci.org/thebearingedge/js-app)

### Tech

- Node.js (Express.js)
- Next.js (React.js)
- PostgreSQL
- Redis
- Cypress

### System Requirements

- `node` v10
- `npm` v6
- `docker-compose` v1.22
- `psql` (optional)
- `redis-cli` (optional)

### Config

`dotenv` is used to load `.env` variables into the application. `.env` also provides initial configuration for the PostgreSQL docker container. Copy `.env.example` to a `.env` to get started.

### Client

`next` (`react`) is used to build a server-rendered web interface to the app.

`styled-components` is used to build custom-styled UI components.

### Server

`node` (`express`) is used to compose the application server and run it in a single process.

### Databases

`knex` (`pg`) is used for all records peristed by the app. The Postgres database server is instantiated via `docker-compose` and available to the app at `POSTGRES_URL`.

`pg-bump` is used to create and execute PostgreSQL migration scripts.

`redis` is used for all session storage of the app. The Redis database is instantiated via `docker-compose` and available to the app at `REDIS_URL`.

### Tests

`mocha` and `chai` are used for API tests. `cypress` (also power by `mocha` and `chai`) is used for end-to-end tests.

### Linting

`eslint` is configured to check all staged JavaScript and JSX files pre-commit.

### Continuous Integration

The app is tested on Travis CI.
