import { Command } from './command.abstract';

export class RegisterProductResellerSaleCommand extends Command {
  constructor(eventAggrateRootId: string, eventData: string) {
    super(eventAggrateRootId, 'PRODUCT_RESELLER_SALE_REGISTERED', eventData);
  }
}
