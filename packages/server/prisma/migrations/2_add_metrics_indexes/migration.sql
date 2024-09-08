CREATE INDEX index_metrics_organization_name ON "metrics"("organization_name");
CREATE INDEX index_metrics_organization_name_reported_at ON "metrics"("organization_name", "reported_at");