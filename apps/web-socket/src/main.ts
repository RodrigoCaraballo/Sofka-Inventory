import { NestFactory } from '@nestjs/core';
import { WebSocketModule } from './web-socket.module';

async function bootstrap() {
  const app = await NestFactory.create(WebSocketModule);
  await app.listen(3003);
}
bootstrap();
