import { BadRequestException, Inject } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { ValueObjectErrorHandler } from '../../../lib/sofka';
import { IProduct, IProductRepository } from '../domain';
import { ProductEntity } from '../domain/model/product.entity';
import { ProductTypeOrmRepository } from '../infrastructure/database/repository/product.repository';
import { RegisterSaleDTO } from '../infrastructure/dto';

export class RegisterFinalCustomerSaleUseCase extends ValueObjectErrorHandler {
  constructor(
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository,
  ) {
    super();
  }

  execute(data: RegisterSaleDTO): Observable<IProduct[]> {
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

        return this.productRepository.saveProducts(newProducts);
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
