# @cozero/server

The backend application.

## Configuration module

### In development

To run the development server locally, you can use the bellow commands:

```sh
# Runs the current version of the server
yarn start

# Runs the current version of the server
# + watches for file changes
yarn start:dev

# Runs the current version of the server
# + watches for file changes
# + opens a debugger connection (default port 9229)
yarn start:debug
```

## Test

Nest comes with `Jest` and `Supertest` testing frameworks to ease the testing process. Here are the different test scripts which you can run:

```sh
# Runs the unit tests
yarn test

# Runs the unit test
# + watches for file changes
yarn test:watch

# Runs the end-to-end tests
yarn test:e2e

# Describes the test coverage
yarn test:cov
```
