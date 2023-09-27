import { Inject, Injectable } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { ValueObjectErrorHandler } from '../../../lib/sofka';
import { IProduct, IProductRepository, ProductEntity } from '../domain';
import { ProductTypeOrmRepository } from '../infrastructure/database/repository/product.repository';
import { RegisterProductInventoryStockDTO } from '../infrastructure/dto';

@Injectable()
export class RegisterProductInventoryStockUseCase extends ValueObjectErrorHandler {
  constructor(
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository,
  ) {
    super();
  }

  execute(data: RegisterProductInventoryStockDTO): Observable<IProduct> {
    const dbProduct = this.productRepository.findProductById(data.productId);

    return dbProduct.pipe(
      switchMap((product: IProduct) => {
        product.productInventoryStock =
          product.productInventoryStock + data.productStock;

        const newProduct = this.validateObject(product);

        return this.productRepository.saveProduct(newProduct);
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
