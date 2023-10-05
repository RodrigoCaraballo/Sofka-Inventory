import {
  CommandResponse,
  ICommandBus,
  IEvent,
  IEventRepository,
  ProductEntity,
  RegisterProductCommand,
  RegisterProductData,
} from '@Domain';
import { BadRequestException } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RegisterProductUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterProductData): Observable<CommandResponse> {
    return this.eventRepository.existProduct(data).pipe(
      map((productRegistered: IEvent) => {
        if (productRegistered)
          throw new BadRequestException('Product is already registered');
        this.emitCommand(data);
        return { statusCode: 200, success: true };
      }),
    );
  }

  private emitCommand(data: RegisterProductData): void {
    const newProduct = this.validateEntity(data);
    console.log(newProduct);

    this.commandBus.publish(
      new RegisterProductCommand(data.branchId, JSON.stringify(newProduct)),
    );
  }

  private validateEntity(data: RegisterProductData): RegisterProductData {
    const newProduct = new ProductEntity({
      name: data.name,
      description: data.description,
      price: data.price,
      inventoryStock: 0,
      category: data.category,
    });

    return {
      id: newProduct.id.valueOf(),
      name: newProduct.name.valueOf(),
      description: newProduct.description.valueOf(),
      price: newProduct.price.valueOf(),
      inventoryStock: 0,
      category: newProduct.category.valueOf(),
      branchId: data.branchId,
    };
  }
}
