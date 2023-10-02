import {
  IProduct,
  IProductRepository,
  ProductEntity,
  RegisterProductInventoryStockData,
} from '@Domain';
import { Observable, switchMap } from 'rxjs';

export class RabbitRegisterProductInventoryStockUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  execute(data: RegisterProductInventoryStockData): Observable<IProduct> {
    const dbProduct = this.productRepository.findProductById(data.product.id);
    return dbProduct.pipe(
      switchMap((product: IProduct) => {
        const productUpdated = this.updateProductStock(product, data);
        return this.saveProduct(productUpdated);
      }),
    );
  }

  private updateProductStock(
    product: IProduct,
    data: RegisterProductInventoryStockData,
  ): IProduct {
    product.inventoryStock =
      product.inventoryStock + data.product.inventoryStock;

    return this.validateEntity(product);
  }

  private saveProduct(product: IProduct): Observable<IProduct> {
    return this.productRepository.saveProduct(product);
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
