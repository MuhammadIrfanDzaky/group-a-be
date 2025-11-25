import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { HealthCheckResponse, ComponentHealth } from './common/dto/health-check.dto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth(): Promise<HealthCheckResponse> {
    const components: HealthCheckResponse['components'] = {};

    // Check database health
    const databaseHealth = await this.checkDatabaseHealth();
    components.database = databaseHealth;

    // Determine overall status
    const allComponentsUp = Object.values(components)
      .filter((component): component is ComponentHealth => component !== undefined)
      .every((component) => component.status === 'UP');

    return {
      status: allComponentsUp ? 'UP' : 'DOWN',
      components,
    };
  }

  private async checkDatabaseHealth(): Promise<ComponentHealth> {
    try {
      const startTime = Date.now();
      await this.prisma.$queryRaw`SELECT 1`;
      const responseTimeMs = Date.now() - startTime;

      return {
        status: 'UP',
        details: {
          connection: 'OK',
          responseTimeMs,
        },
      };
    } catch (error) {
      return {
        status: 'DOWN',
        details: {
          connection: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }
}
