import { NestFactory } from '@nestjs/core';
import { EventMongooseSeedService } from './infrastructure/seed';
import { InventoryCommandModule } from './inventory-command.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryCommandModule).then(
    (appContext) => {
      const seeder = appContext.get(EventMongooseSeedService);

      seeder.seedData();

      return appContext;
    },
  );

  app.enableCors({
    origin: '*',
  });

  await app.listen(3000);
}
bootstrap();
