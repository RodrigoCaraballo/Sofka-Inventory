import { Command } from './command.abstract';

export class RegisterProductInventoryStockCommand extends Command {
  constructor(eventAggrateRootId: string, eventData: string) {
    super(eventAggrateRootId, 'PRODUCT_INVENTORY_STOCK_REGISTERED', eventData);
  }
}
