import {
  ICommandBus,
  ProductEntity,
  RegisterProductCommand,
  RegisterProductData,
} from '@Domain';

export class RegisterProductUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  execute(data: RegisterProductData): void {
    this.validateEntity(data);
    this.emitCommand(data);
  }

  private emitCommand(data: RegisterProductData): void {
    const newProduct = this.validateEntity(data);
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
      inventoryStock: newProduct.inventoryStock.valueOf(),
      category: newProduct.category.valueOf(),
      branchId: data.branchId,
    };
  }
}
