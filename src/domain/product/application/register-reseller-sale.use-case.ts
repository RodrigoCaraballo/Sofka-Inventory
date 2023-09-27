import { BadRequestException, Inject } from '@nestjs/common';
import { Observable, of, switchMap } from 'rxjs';
import { ValueObjectErrorHandler } from '../../../lib/sofka';
import { IProduct, IProductRepository, ProductEntity } from '../domain';
import { ProductTypeOrmRepository } from '../infrastructure/database/repository/product.repository';
import { RegisterSaleDTO } from '../infrastructure/dto';

export class RegisterResellerSaleUseCase extends ValueObjectErrorHandler {
  constructor(
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository,
  ) {
    super();
  }

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

        const newData = data.products.map((product) => ({
          ...product,
          productPrice: product.productPrice * 0.9,
        }));

        return of({ products: newData });
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
