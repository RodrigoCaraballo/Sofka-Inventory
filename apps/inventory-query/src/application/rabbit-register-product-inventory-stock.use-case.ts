import {
  IProduct,
  IProductRepository,
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

    return product;
  }

  private saveProduct(product: IProduct): Observable<IProduct> {
    return this.productRepository.saveProduct(product);
  }
}
