import { NestFactory } from '@nestjs/core';
import { AuthorizationModule } from './authorization.module';
import { UserMongooseSeedService } from './infrastructure/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AuthorizationModule).then(
    (appContext) => {
      const seeder = appContext.get(UserMongooseSeedService);

      seeder.seedData();

      return appContext;
    },
  );
  app.enableCors({
    origin: '*',
  });

  await app.listen(3005);
}
bootstrap();
