import {
  CommandResponse,
  ICommandBus,
  IEvent,
  IEventRepository,
  RegisterProductData,
  RegisterProductInventoryStockCommand,
  RegisterProductInventoryStockData,
  RegisterProductUpdated,
  RegisterReturnSaleCommand,
  RegisterReturnSaleData,
} from '@Domain';
import { NotFoundException } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RegisterReturnSaleUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterReturnSaleData): Observable<CommandResponse> {
    return this.eventRepository.findProduct(data.branchId, data.productId).pipe(
      map((event: IEvent) => {
        if (!event) throw new NotFoundException('Product not found');
        const dbProduct = event.eventData as RegisterProductData;
        dbProduct.inventoryStock =
          dbProduct.inventoryStock + data.inventoryStock;

        const updateProduct: RegisterProductInventoryStockData = {
          branchId: dbProduct.branchId,
          product: {
            id: dbProduct.id,
            inventoryStock: data.inventoryStock,
          },
        };

        this.emitInventoryStock(updateProduct);
        this.emitProductUpdate(dbProduct);
        this.emitReturnSale(data);

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

  private emitReturnSale(data: RegisterReturnSaleData): void {
    this.commandBus.publish(
      new RegisterReturnSaleCommand(data.branchId, JSON.stringify(data)),
    );
  }
}
