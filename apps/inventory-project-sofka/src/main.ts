import { NestFactory } from '@nestjs/core';
import { InventoryCommandModule } from './inventory-command.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryCommandModule);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
