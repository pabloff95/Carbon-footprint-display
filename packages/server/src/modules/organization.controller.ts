import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from '../services/organization';
import { EmissionsData, baseYear } from '../../../lib/src/index';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationService: OrganizationService) {}

  @Get('/')
  async organizations(): Promise<string[]> {
    return this.organizationService.getUniqueOrganizationNames();
  }

  @Get('/emissions/:organizationName')
  async getOrganizationEmissions(
    @Param('organizationName') organizationName: string
  ): Promise<EmissionsData[]> {
    // This endpoint paralelizes the emission queries by each year
    const years = [];
    for (let i = baseYear; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }

    return Promise.all(
      years.map(async year =>
        this.organizationService.getOrganizationMonthlyEmissionsByYear({
          organizationName,
          year,
        })
      )
    );
  }
}
