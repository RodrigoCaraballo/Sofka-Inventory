import { NestFactory } from '@nestjs/core';
import { InventoryQueryModule } from './inventory-query.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryQueryModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
