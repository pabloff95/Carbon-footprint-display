import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { ReportsModule } from './reports/reports.module';
import { OrganizationsController } from './organizations/organization.controller';
import { OrganizationService } from './organizations/organization.service';

@Module({
  imports: [
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [config],
    }),
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationService],
})
export class APIModule {}
