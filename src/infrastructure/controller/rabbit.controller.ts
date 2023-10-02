import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class RabbitController {
  @EventPattern('BRANCH_REGISTERED')
  eventPublsihed(@Payload() payload: string): void {
    console.log('Helo');

    console.log(JSON.parse(payload));
  }
}
