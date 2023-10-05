import { Command } from './command.abstract';

export class RegisterProductUpdated extends Command {
  constructor(eventAggrateRootId: string, eventData: string) {
    super(eventAggrateRootId, 'PRODUCT_UPDATED', eventData);
  }
}
