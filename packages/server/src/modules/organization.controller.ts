import { Controller, Get } from '@nestjs/common';
import { OrganizationService } from '../services/organization';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationService: OrganizationService) {}

  @Get('/')
  async organizations(): Promise<string[]> {
    return this.organizationService.getUniqueOrganizationNames();
  }
}
