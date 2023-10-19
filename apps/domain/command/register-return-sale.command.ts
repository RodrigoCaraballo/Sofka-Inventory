import { Command } from './command.abstract';

export class RegisterReturnSaleCommand extends Command {
  constructor(
    eventAggrateRootId: string,
    eventData: string,
    eventType: string = 'RETURN_SALE_REGISTERED',
  ) {
    super(eventAggrateRootId, eventType, eventData);
  }
}
