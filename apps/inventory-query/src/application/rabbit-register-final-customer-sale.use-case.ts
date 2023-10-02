import { BadRequestException } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';

import {
  IProduct,
  IProductRepository,
  ProductEntity,
  RegisterSaleData,
} from '@Domain';

export class RabbitRegisterFinalCustomerSaleUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  execute(data: RegisterSaleData): Observable<IProduct[]> {
    const dbProduct = this.getProducts(data);
    return dbProduct.pipe(
      switchMap((products: IProduct[]) => {
        const updatedProducts = this.updateProductsStock(products, data);
        return this.saveProducts(updatedProducts);
      }),
    );
  }

  private getProducts(data: RegisterSaleData): Observable<IProduct[]> {
    const productsId = data.products.map((product) => product.id);
    return this.productRepository.findProductsById(productsId);
  }

  private updateProductsStock(
    products: IProduct[],
    data: RegisterSaleData,
  ): IProduct[] {
    return products.map((product) => {
      const findProduct = data.products.find(
        (dataProduct) => dataProduct.id === product.id,
      );

      if (!findProduct) return product;

      if (product.inventoryStock < findProduct.inventoryStock)
        throw new BadRequestException('Product Inventory Stock not enough');

      product.inventoryStock =
        product.inventoryStock - findProduct.inventoryStock;

      const newProduct = this.validateEntity(product);

      return newProduct;
    });
  }

  private saveProducts(products: IProduct[]): Observable<IProduct[]> {
    return this.productRepository.saveProducts(products);
  }

  private validateEntity(product: IProduct): IProduct {
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
