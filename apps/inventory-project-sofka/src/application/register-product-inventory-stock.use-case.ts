import {
  ICommandBus,
  RegisterProductInventoryStockCommand,
  RegisterProductInventoryStockData,
} from '@Domain';

export class RegisterProductInventoryStockUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  execute(data: RegisterProductInventoryStockData): void {
    this.emitCommand(data);
  }

  private emitCommand(data: RegisterProductInventoryStockData): void {
    this.commandBus.publish(
      new RegisterProductInventoryStockCommand(
        data.branchId,
        JSON.stringify(data),
      ),
    );
  }
}
