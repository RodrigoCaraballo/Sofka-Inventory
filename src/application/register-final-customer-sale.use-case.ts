import { BadRequestException, Inject } from '@nestjs/common';
import { Observable, of, switchMap } from 'rxjs';

import { RegisterSaleDTO } from '@DTO';
import { ProductTypeOrmRepository } from '@Database';
import { IProduct, IProductRepository } from '@Interfaces';
import { ProductEntity } from '@Model';

export class RegisterFinalCustomerSaleUseCase {
  constructor(
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  execute(data: RegisterSaleDTO): Observable<RegisterSaleDTO> {
    const productsId = data.products.map((product) => product.productId);
    const dbProduct = this.productRepository.findProductsById(productsId);

    return dbProduct.pipe(
      switchMap((products: IProduct[]) => {
        const newProducts = products.map((product) => {
          const findProduct = data.products.find(
            (dataProduct) => dataProduct.productId === product.productId,
          );

          if (!findProduct) return product;

          if (product.productInventoryStock < findProduct.productStock)
            throw new BadRequestException('Product Inventory Stock not enough');

          product.productInventoryStock =
            product.productInventoryStock - findProduct.productStock;

          const newProduct = this.validateObject(product);

          return newProduct;
        });

        this.productRepository.saveProducts(newProducts);

        return of(data);
      }),
    );
  }

  private validateObject(product: IProduct): IProduct {
    const newProductEntity = new ProductEntity(product);

    return {
      productId: newProductEntity.productId.valueOf(),
      productName: newProductEntity.productName.valueOf(),
      productDescription: newProductEntity.productDescription.valueOf(),
      productPrice: newProductEntity.productPrice.valueOf(),
      productInventoryStock: newProductEntity.productInventoryStock.valueOf(),
      productCategory: newProductEntity.productCategory.valueOf(),
      productBranch: product.productBranch,
    };
  }
}
