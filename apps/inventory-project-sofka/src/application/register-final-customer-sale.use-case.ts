import {
  ICommandBus,
  RegisterFinalCustomerSaleCommand,
  RegisterSaleData,
} from '@Domain';

export class RegisterFinalCustomerSaleUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  execute(data: RegisterSaleData): void {
    this.emitCommand(data);
  }

  private emitCommand(data: RegisterSaleData): void {
    this.commandBus.publish(
      new RegisterFinalCustomerSaleCommand(data.branchId, JSON.stringify(data)),
    );
  }
}
