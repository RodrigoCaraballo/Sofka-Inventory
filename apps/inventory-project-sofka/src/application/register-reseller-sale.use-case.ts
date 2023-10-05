import {
  CommandResponse,
  ICommandBus,
  IEvent,
  IEventRepository,
  RegisterFinalCustomerSaleCommand,
  RegisterProductData,
  RegisterSaleData,
} from '@Domain';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RegisterResellerSaleUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterSaleData): Observable<CommandResponse> {
    return this.eventRepository.findProduct(data.branchId, data.id).pipe(
      map((productRegistered: IEvent) => {
        if (!productRegistered)
          throw new NotFoundException('Product not registered');

        const productParsed: RegisterProductData =
          productRegistered.eventData as RegisterProductData;

        if (productParsed.inventoryStock < data.inventoryStock)
          throw new BadRequestException('Product inventory is not enough');

        productParsed.inventoryStock =
          productParsed.inventoryStock - data.inventoryStock;

        this.emitCommand(productParsed);
        return { statusCode: 200, success: true };
      }),
    );
  }

  private emitCommand(data: RegisterProductData): void {
    this.commandBus.publish(
      new RegisterFinalCustomerSaleCommand(data.branchId, JSON.stringify(data)),
    );
  }
}
