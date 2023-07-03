import { Controller, Get } from '@nestjs/common';
import { OrganizationService } from '../services/organization';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationService: OrganizationService) {}

  @Get('/')
  async organizations(): Promise<any> {
    return this.organizationService.getUniqueOrganizationNames();
  }
}
