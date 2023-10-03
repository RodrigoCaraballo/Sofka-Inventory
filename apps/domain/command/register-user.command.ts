import { Command } from './command.abstract';

export class RegisterUserCommand extends Command {
  constructor(
    eventAggrateRootId: string,
    eventData: string,
    eventType: string = 'USER_REGISTERED',
  ) {
    super(eventAggrateRootId, eventType, eventData);
  }
}
