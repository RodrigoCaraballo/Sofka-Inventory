import { Command } from './command.abstract';

export class RegisterUserCommand extends Command {
  constructor(eventAggrateRootId: string, eventData: string) {
    super(eventAggrateRootId, 'USER_REGISTERED', eventData);
  }
}
