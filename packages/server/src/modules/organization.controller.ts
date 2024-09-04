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
  ): Promise<{ date: Date; emissions: number }[]> {
    const emissions = await this.organizationService.getOrganizationEmissions(
      organizationName
    );

    return emissions;
  }
}
