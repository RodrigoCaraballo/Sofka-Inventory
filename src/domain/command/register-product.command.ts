import { Command } from './command.abstract';

export class RegisterProductCommand extends Command {
  constructor(eventAggrateRootId: string, eventData: string) {
    super(eventAggrateRootId, 'PRODUCT_REGISTERED', eventData);
  }
}
