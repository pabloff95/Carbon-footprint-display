-- CreateTable
CREATE TABLE "metrics" (
    "reported_at" TIMESTAMPTZ(6),
    "organization_name" TEXT,
    "emissions" DOUBLE PRECISION,
    "id" SERIAL NOT NULL,

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id")
);
