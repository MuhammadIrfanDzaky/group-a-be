import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  const allowOrigin = ['http://localhost:3001', 'http://localhost:3000', 'https://final-project-fe-muhammad-irfan-dza.vercel.app, https://a-we-rent-fe.vercel.app/product', '*'];

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