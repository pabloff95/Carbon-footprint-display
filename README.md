<p align="left">
  <a href="https://cozero.io/" target="blank"><img src="./COZERO_LOGO.svg" width="340" alt="Nest Logo" /></a>
</p>
<br />

# Cozero Reports Challenge

Welcome to our technical challenge!

Thank you for taking the time to go through it; we realize it's no small ask. Good luck! 🍀

## Tasks

The challenge is composed of two tasks:

1. Implement the `Emissions Report` issue (see _Issues_).
2. Review the `Emissions Table` pull request (see _Pull requests_).

### Process

Set your own schedule to work on the challenge and take the necessary time to think; there's no need to rush. With respect to your own time, please don't spend more than **four hours** on the challenge. Once you're done, please drop us an email at tech-hr@cozero.io. We will review your challenge solution and comment on the PRs in case of questions.

With this challenge, you have also received an invitation to a follow-up session. We will discuss your solution and the decisions you made. This is a great opportunity for you to elaborate on your reasoning and ask any questions you might have.

## Project structure

The project consists of three packages:

- `@cozero/lib` - A shared library used by both the client and server package.
- `@cozero/server` - A [NestJS](https://nestjs.com/) API that connects to the Postgres database via [Prisma](prisma.io/).
- `@cozero/client` - A [React](https://react.dev/) application with [AntD](https://ant.design/) UI that talks to the API.

## Getting started

1. **Dependencies**

   Install dependencies and build the libs you need to run the project:

   ```bash
   yarn bootstrap
   ```

2. **Database**

   _Ensure you have Docker installed and go through the following steps._

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

   _After this, you will get a Postgres instance running on your machine with a `metrics` table containing initial data._

3. **Run project**

   Start the backend and frontend application:

   ```bash
   yarn --cwd packages/server start:dev
   yarn --cwd packages/client start:dev
   ```

   _After this, you should be able to navigate to http://localhost:8080/ and get feedback about the app connecting to the API._
