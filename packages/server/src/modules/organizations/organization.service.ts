import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EmissionsData } from '@carbonfootprintdisplay/lib/src/index';

@Injectable()
export class OrganizationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getUniqueOrganizationNames = async (): Promise<string[]> => {
    try {
      const uniqueOrganizationNames: { name: string }[] = await this.prisma
        .$queryRaw`
          SELECT DISTINCT organization_name AS name
          FROM metrics          
        `;

      return uniqueOrganizationNames
        .map(organization => organization.name)
        .filter(organizationName => !!organizationName);
    } catch (error) {
      console.error('Error while fetching the organization names:', error);
      throw error;
    }
  };

  getOrganizationMonthlyEmissionsByYear = async ({
    organizationName,
    year,
  }: {
    organizationName: string;
    year: number;
  }): Promise<EmissionsData> => {
    try {
      // This query summarizes all the monthly emissions in the received year of the target organization
      const organizationEmissions: { month: number; emissions: number }[] =
        await this.prisma.$queryRaw`
         SELECT
          EXTRACT(MONTH FROM reported_at) AS month,
          SUM(emissions) AS emissions
        FROM metrics
        WHERE organization_name = ${organizationName}
        AND reported_at >= ${new Date(`${year}-01-01`)}
        AND reported_at <= ${new Date(`${year}-12-31`)}
        GROUP BY month
      `;

      return { year, monthsData: organizationEmissions };
    } catch (error) {
      console.error('Error while fetching the organization emissions:', error);
      throw error;
    }
  };
}
