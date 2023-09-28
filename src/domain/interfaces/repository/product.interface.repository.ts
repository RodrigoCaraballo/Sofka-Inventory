import { Observable } from 'rxjs';
import { IProduct } from '../model';

export interface IProductRepository<T = IProduct> {
  saveProduct(product: T): Observable<T>;
  saveProducts(products: T[]): Observable<T[]>;
  findProductById(productId: string): Observable<T>;
  findProductsById(productsId: string[]): Observable<T[]>;
}
