import { NestFactory } from '@nestjs/core';
import { InventoryCommandModule } from './inventory-command.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryCommandModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
