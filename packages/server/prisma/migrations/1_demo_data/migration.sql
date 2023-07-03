INSERT INTO "metrics" (reported_at, organization_name, emissions)
SELECT
    reported_at,
    (array ['Company1', 'Company2', 'Company3'])[floor(random() * 3 + 1)] AS organization_name,
    random() * 0.0001 as emissions
FROM
    generate_series(
        '2000-01-01 00:00:00',
        '2023-01-01 11:00:00',
        INTERVAL '1 minute'
    ) as reported_at;
