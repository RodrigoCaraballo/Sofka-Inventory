import { NestFactory } from '@nestjs/core';
import { WebSocketModule } from './web-socket.module';

async function bootstrap() {
  const app = await NestFactory.create(WebSocketModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3003);
}
bootstrap();
