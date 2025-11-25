import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckResponse } from './common/dto/health-check.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHealth(): Promise<HealthCheckResponse> {
    return this.appService.getHealth();
  }
}
