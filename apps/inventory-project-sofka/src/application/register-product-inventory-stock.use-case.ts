import {
  CommandResponse,
  ICommandBus,
  IEvent,
  IEventRepository,
  RegisterProductData,
  RegisterProductInventoryStockCommand,
  RegisterProductInventoryStockData,
  RegisterProductUpdated,
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
          if (!productEvent) throw new NotFoundException('Product not found');
          const productParsed: RegisterProductData =
            productEvent.eventData as RegisterProductData;

          productParsed.inventoryStock =
            productParsed.inventoryStock + data.product.inventoryStock;

          console.log(productParsed.inventoryStock);

          this.emitInventoryStock(data);
          this.emitProductUpdate(productParsed);
          return { statusCode: 200, success: true };
        }),
      );
  }

  private emitInventoryStock(data: RegisterProductInventoryStockData): void {
    this.commandBus.publish(
      new RegisterProductInventoryStockCommand(
        data.branchId,
        JSON.stringify(data),
      ),
    );
  }

  private emitProductUpdate(data: RegisterProductData): void {
    this.commandBus.publish(
      new RegisterProductUpdated(data.branchId, JSON.stringify(data)),
    );
  }
}
