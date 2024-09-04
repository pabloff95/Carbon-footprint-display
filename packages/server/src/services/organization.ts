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
}
