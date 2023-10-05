import { IProduct, IProductRepository, RegisterProductData } from '@Domain';
import { Observable, switchMap } from 'rxjs';

export class RabbitRegisterProductUpdateUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  execute(data: RegisterProductData): Observable<IProduct> {
    const dbProduct = this.productRepository.findProductById(data.id);
    return dbProduct.pipe(
      switchMap((product: IProduct) => {
        product.inventoryStock = data.inventoryStock;
        return this.saveProduct(product);
      }),
    );
  }

  private saveProduct(product: IProduct): Observable<IProduct> {
    return this.productRepository.saveProduct(product);
  }
}
