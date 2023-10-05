import {
  IProduct,
  IProductRepository,
  ISaleRepository,
  RegisterProductData,
} from '@Domain';
import { Observable, switchMap } from 'rxjs';

export class RabbitRegisterResellerSaleUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly saleRepository: ISaleRepository,
  ) {}

  execute(data: RegisterProductData): Observable<IProduct> {
    const dbProduct = this.getProduct(data);
    return dbProduct.pipe(
      switchMap((product: IProduct) => {
        this.saleRepository.saveSale({
          branch: product.branch,
          productName: product.name,
          productPrice: product.price,
          quantity: product.inventoryStock - data.inventoryStock,
        });
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
