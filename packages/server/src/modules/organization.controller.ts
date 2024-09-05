import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from '../services/organization';

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
  ): Promise<
    {
      year: number;
      monthsData: { month: number; emissions: number }[];
    }[]
  > {
    // This endpoint paralelizes the emission queries by each year, startin on the year 2000 (earliest year in the DB)
    const years = [];
    for (let i = 2000; i <= new Date().getFullYear(); i++) {
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
