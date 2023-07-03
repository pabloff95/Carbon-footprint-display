import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { ReportsModule } from './reports/reports.module';
import { PingController } from './ping.controller';
import { OrganizationsController } from './organization.controller';
import { OrganizationService } from '../services/organization';

@Module({
  imports: [
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [config],
    }),
  ],
  controllers: [PingController, OrganizationsController],
  providers: [OrganizationService],
})
export class APIModule {}
