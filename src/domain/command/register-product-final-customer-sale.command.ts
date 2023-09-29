import { Command } from './command.abstract';

export class RegisterFinalCustomerSaleCommand extends Command {
  constructor(eventAggrateRootId: string, eventData: string) {
    super(
      eventAggrateRootId,
      'PRODUCT_FINAL_CUSTOMER_SALE_REGISTERED',
      eventData,
    );
  }
}
