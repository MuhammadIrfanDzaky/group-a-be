import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const allowOrigin = ['http://localhost:3001', 'http://localhost:3000', 'https://a-we-rent-fe.vercel.app'];

  app.enableCors({
    origin: allowOrigin,
    credentials: true,
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin'],
    exposedHeaders: ['Content-Length', 'X-Total-Count'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();