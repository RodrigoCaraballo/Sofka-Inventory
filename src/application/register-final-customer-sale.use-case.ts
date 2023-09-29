import { BadRequestException, Inject } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';

import { RegisterFinalCustomerSaleCommand } from '@Command';
import { ProductTypeOrmRepository } from '@Database';
import { IProduct, IProductRepository, RegisterSaleData } from '@Interfaces';
import { ProductEntity } from '@Model';
import { CommandBus } from '@nestjs/cqrs';

export class RegisterFinalCustomerSaleUseCase {
  constructor(
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository,
    private readonly commandBus: CommandBus,
  ) {}

  execute(data: RegisterSaleData): Observable<IProduct[]> {
    const productsId = data.products.map((product) => product.id);
    const dbProduct = this.productRepository.findProductsById(productsId);

    return dbProduct.pipe(
      switchMap((products: IProduct[]) => {
        const newProducts = products.map((product) => {
          const findProduct = data.products.find(
            (dataProduct) => dataProduct.id === product.id,
          );

          if (!findProduct) return product;

          if (product.inventoryStock < findProduct.inventoryStock)
            throw new BadRequestException('Product Inventory Stock not enough');

          product.inventoryStock =
            product.inventoryStock - findProduct.inventoryStock;

          const newProduct = this.validateObject(product);

          return newProduct;
        });

        this.commandBus.execute(
          new RegisterFinalCustomerSaleCommand(
            newProducts[0].branch.id,
            JSON.stringify(newProducts),
          ),
        );

        return this.productRepository.saveProducts(newProducts);
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
