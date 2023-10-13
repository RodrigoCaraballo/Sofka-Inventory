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
    datas: RegisterProductInventoryStockData[],
  ): Observable<CommandResponse> {
    const productIds = datas.map((product) => product.product.id);
    return this.eventRepository
      .findProducts(datas[0].branchId, productIds)
      .pipe(
        map((productEvent: IEvent[]) => {
          if (!productEvent || productEvent.length === 0)
            throw new NotFoundException('Product not found');

          const productsUpdated = productEvent.map((productEvent: IEvent) => {
            const productParsed: RegisterProductData =
              productEvent.eventData as RegisterProductData;

            const productDTO = datas.find(
              (productSearch) => productSearch.product.id === productParsed.id,
            );

            productParsed.inventoryStock =
              productParsed.inventoryStock + productDTO.product.inventoryStock;
            return productParsed;
          });

          this.emitInventoryStock(datas);
          this.emitProductUpdate(productsUpdated);
          return { statusCode: 200, success: true };
        }),
      );
  }

  private emitInventoryStock(datas: RegisterProductInventoryStockData[]): void {
    datas.forEach((data) => {
      this.commandBus.publish(
        new RegisterProductInventoryStockCommand(
          data.branchId,
          JSON.stringify(data),
        ),
      );
    });
  }

  private emitProductUpdate(datas: RegisterProductData[]): void {
    datas.forEach((data) => {
      this.commandBus.publish(
        new RegisterProductUpdated(data.branchId, JSON.stringify(data)),
      );
    });
  }
}
