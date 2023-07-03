import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrganizationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUniqueOrganizationNames(): Promise<string[]> {
    const uniqueOrganizationNames = await this.prisma.$queryRaw<
      Array<{ organization_name: string }>
    >`
    SELECT DISTINCT organization_name
    FROM metrics
    WHERE organization_name IS NOT NULL AND organization_name != ''    
  `;

    return uniqueOrganizationNames.map(
      organization => organization.organization_name
    );
  }
}
