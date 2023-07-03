# A Postgres image that contains the pg_cron extension.
# We use this extension to do periodic maintenance jobs.
# See libs/prisma/migrations/20230518181000_company_emissions_as_materialized_view/migration.sql for example.

FROM postgres

RUN apt-get update && apt-get -y install git build-essential postgresql-server-dev-15

RUN psql CREATE TABLE metrics AS SELECT time, organization_id, random()*0.01 as emisions FROM generate_series( '2020-01-01 00:00:00', '2023-01-01 11:00:00', INTERVAL '1 hour') as time, generate_series(1,4) organization_id;
