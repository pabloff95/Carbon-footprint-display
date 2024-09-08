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
    /**
     * Due to lack of time, I didn't continue with the implementation here, but this endpoint could be splited in two: one used for the year data and another
     * one for the month data (instead of the current implementation where everything is returned at once).
     * However, the current approach has a clear advantage: once the data is loaded no more queries are required, then the user can change the month - year
     * view as much as he/she desires. At the end, this would depend on how users use the application and on the size of the database.
     */
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
