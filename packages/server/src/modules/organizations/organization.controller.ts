import { Controller, Get, Param, Injectable } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { EmissionsData, baseYear } from '@carbonfootprintdisplay/lib/src/index';

@Injectable()
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('/')
  async organizations(): Promise<string[]> {
    return this.organizationService.getUniqueOrganizationNames();
  }

  @Get('/emissions/:organizationName')
  async getOrganizationEmissions(
    @Param('organizationName') organizationName: string
  ): Promise<EmissionsData[]> {
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
