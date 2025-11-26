import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthCheckResponse } from './common/dto/health-check.dto';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy', type: Object })
  @ApiResponse({ status: 503, description: 'Service is unhealthy' })
  async getHealth(): Promise<HealthCheckResponse> {
    return this.appService.getHealth();
  }
}
