import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrganizationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUniqueOrganizationNames(): Promise<string[]> {
    try {
      const uniqueOrganizationNames: { name: string }[] = await this.prisma
        .$queryRaw`
          SELECT DISTINCT organization_name AS name
          FROM metrics
          WHERE organization_name IS NOT NULL AND organization_name != ''
        `;

      return uniqueOrganizationNames.map(organization => organization.name);
    } catch (error) {
      console.error('Error while fetching the organization names:', error);
      throw error;
    }
  }

  async getOrganizationMonthlyEmissionsByYear({
    organizationName,
    year,
  }: {
    organizationName: string;
    year: number;
  }): Promise<{
    year: number;
    monthsData: { month: number; emissions: number }[];
  }> {
    try {
      // This query summarizes all the monthly emissions in the received year of the target organization
      const organizationEmissions: { month: number; emissions: number }[] =
        await this.prisma.$queryRaw`
        SELECT
          EXTRACT(MONTH FROM reported_at) AS month,
          SUM(emissions) AS emissions
        FROM metrics
        WHERE organization_name = ${organizationName}
        AND reported_at BETWEEN ${new Date(`${year}-01-01`)} AND ${new Date(
          `${year}-12-31`
        )}
        GROUP BY EXTRACT(MONTH FROM reported_at)
      `;

      return { year, monthsData: organizationEmissions };
    } catch (error) {
      console.error('Error while fetching the organization emissions:', error);
      throw error;
    }
  }
}
