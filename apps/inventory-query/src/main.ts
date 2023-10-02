import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InventoryQueryModule } from './inventory-query.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryQueryModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'BRANCH_QUEUE',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
