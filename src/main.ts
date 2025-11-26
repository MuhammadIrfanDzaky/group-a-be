import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowOrigin = ['http://localhost:3001', 'http://localhost:3000', 'https://final-project-fe-muhammad-irfan-dza.vercel.app, https://a-we-rent-fe.vercel.app/product', '*'];

  app.enableCors({
    origin: allowOrigin,
    credentials: true,
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin'],
    exposedHeaders: ['Content-Length', 'X-Total-Count'],
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Group A API')
    .setDescription('API documentation for Group A Backend')
    .setVersion('1.0')
    .addTag('health', 'Health check endpoints')
    .addTag('products', 'Product management endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();