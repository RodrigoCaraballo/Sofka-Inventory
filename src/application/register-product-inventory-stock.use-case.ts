import { RegisterProductInventoryStockCommand } from '@Command';
import { ProductTypeOrmRepository } from '@Database';
import {
  IProduct,
  IProductRepository,
  RegisterProductInventoryStockData,
} from '@Interfaces';
import { ProductEntity } from '@Model';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class RegisterProductInventoryStockUseCase {
  constructor(
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository,
    private readonly commandBus: CommandBus,
  ) {}

  execute(data: RegisterProductInventoryStockData): Observable<IProduct> {
    const dbProduct = this.productRepository.findProductById(data.id);

    return dbProduct.pipe(
      switchMap((product: IProduct) => {
        product.inventoryStock = product.inventoryStock + data.inventoryStock;

        const newProduct = this.validateObject(product);

        this.commandBus.execute(
          new RegisterProductInventoryStockCommand(
            product.branch.id,
            JSON.stringify(newProduct),
          ),
        );

        return this.productRepository.saveProduct(newProduct);
      }),
    );
  }

  private validateObject(product: IProduct): IProduct {
    const newProductEntity = new ProductEntity(product);

    return {
      id: newProductEntity.id.valueOf(),
      name: newProductEntity.name.valueOf(),
      description: newProductEntity.description.valueOf(),
      price: newProductEntity.price.valueOf(),
      inventoryStock: newProductEntity.inventoryStock.valueOf(),
      category: newProductEntity.category.valueOf(),
      branch: product.branch,
    };
  }
}
