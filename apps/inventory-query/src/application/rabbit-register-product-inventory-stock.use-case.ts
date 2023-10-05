import { IProduct, IProductRepository, RegisterProductData } from '@Domain';
import { Observable, switchMap } from 'rxjs';

export class RabbitRegisterProductInventoryStockUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  execute(data: RegisterProductData): Observable<IProduct> {
    const dbProduct = this.productRepository.findProductById(data.id);
    return dbProduct.pipe(
      switchMap((product: IProduct) => {
        const productUpdated = this.updateProductStock(product, data);
        return this.saveProduct(productUpdated);
      }),
    );
  }

  private updateProductStock(
    product: IProduct,
    data: RegisterProductData,
  ): IProduct {
    product.inventoryStock = data.inventoryStock;

    return product;
  }

  private saveProduct(product: IProduct): Observable<IProduct> {
    return this.productRepository.saveProduct(product);
  }
}
