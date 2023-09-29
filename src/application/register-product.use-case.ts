import { RegisterProductCommand } from '@Command';
import {
  IBranch,
  IBranchRepository,
  IProduct,
  IProductRepository,
  RegisterProductData,
} from '@Interfaces';
import { ProductEntity } from '@Model';
import { CommandBus } from '@nestjs/cqrs';
import { Observable, switchMap } from 'rxjs';

export class RegisterProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly branchRepository: IBranchRepository,
    private readonly commandBus: CommandBus,
  ) {}

  execute(data: RegisterProductData): Observable<IProduct> {
    return this.branchRepository.findBranchById(data.branchId).pipe(
      switchMap((branch: IBranch) => {
        const product = this.createValueObject(data, branch);
        this.commandBus.execute(
          new RegisterProductCommand(data.branchId, JSON.stringify(product)),
        );

        return this.productRepository.saveProduct({
          id: product.id.valueOf(),
          name: product.name.valueOf(),
          description: product.description.valueOf(),
          price: product.price.valueOf(),
          inventoryStock: product.inventoryStock.valueOf(),
          category: product.category.valueOf(),
          branch: branch,
        });
      }),
    );
  }

  createValueObject(data: RegisterProductData, branch: IBranch): IProduct {
    const newProduct = new ProductEntity({
      name: data.name,
      description: data.description,
      price: data.price,
      inventoryStock: data.inventoryStock,
      category: data.category,
      branch: branch,
    });

    return {
      id: newProduct.id.valueOf(),
      name: newProduct.name.valueOf(),
      description: newProduct.description.valueOf(),
      price: newProduct.price.valueOf(),
      inventoryStock: newProduct.inventoryStock.valueOf(),
      category: newProduct.category.valueOf(),
      branch: branch,
    };
  }
}
