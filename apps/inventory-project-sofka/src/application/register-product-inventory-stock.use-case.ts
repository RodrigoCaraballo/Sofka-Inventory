import {
  CommandResponse,
  ICommandBus,
  IEvent,
  IEventRepository,
  RegisterProductData,
  RegisterProductInventoryStockCommand,
  RegisterProductInventoryStockData,
} from '@Domain';
import { NotFoundException } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RegisterProductInventoryStockUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(
    data: RegisterProductInventoryStockData,
  ): Observable<CommandResponse> {
    return this.eventRepository
      .findProduct(data.branchId, data.product.id)
      .pipe(
        map((productEvent: IEvent) => {
          console.log(productEvent);

          if (!productEvent) throw new NotFoundException('Product not found');
          const productParsed: RegisterProductData =
            productEvent.eventData as RegisterProductData;

          productParsed.inventoryStock =
            productParsed.inventoryStock + data.product.inventoryStock;

          this.emitCommand(productParsed);
          return { statusCode: 200, success: true };
        }),
      );
  }

  private emitCommand(data: RegisterProductData): void {
    this.commandBus.publish(
      new RegisterProductInventoryStockCommand(
        data.branchId,
        JSON.stringify(data),
      ),
    );
  }
}
