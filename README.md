## Project structure

The project consists of three packages:

- `lib` - A shared library used by both the client and server package.
- `server` - A [NestJS](https://nestjs.com/) API that connects to the Postgres database via [Prisma](prisma.io/).
- `client` - A [React](https://react.dev/) application with [AntD](https://ant.design/) UI that talks to the API.

## Start project

1. **Dependencies**

   Install dependencies:

   ```bash
   yarn bootstrap
   ```

2. **Database**
   Start the database container:

   ```bash
   docker-compose up -d
   ```

   Create a `.env` file to configure the database connection:

   ```bash
   cp packages/server/.env.example packages/server/.env

   ```

   Run migrations to populate the database:

   ```bash
   yarn --cwd packages/server db:migrate
   ```

3. **Run project**

   Start the backend and frontend application:

   ```bash
   yarn --cwd packages/server start:dev
   yarn --cwd packages/client start:dev
   ```

   Then navigate to http://localhost:8080/
