import { IProduct, IProductRepository, RegisterProductData } from '@Domain';
import { Observable, switchMap } from 'rxjs';

export class RabbitRegisterResellerSaleUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  execute(data: RegisterProductData): Observable<IProduct> {
    const dbProduct = this.getProduct(data);
    return dbProduct.pipe(
      switchMap((product: IProduct) => {
        product.inventoryStock = data.inventoryStock;
        return this.saveProducts(product);
      }),
    );
  }

  private getProduct(data: RegisterProductData): Observable<IProduct> {
    return this.productRepository.findProductById(data.id);
  }

  private saveProducts(product: IProduct): Observable<IProduct> {
    return this.productRepository.saveProduct(product);
  }
}
