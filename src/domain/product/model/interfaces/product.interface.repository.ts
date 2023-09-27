import { Observable } from 'rxjs';

export interface IProductRepository<T> {
  saveProduct(product: T): Observable<T>;
  saveProducts(products: T[]): Observable<T[]>;
  findProductById(productId: string): Observable<T>;
  findProductsById(productsId: string[]): Observable<T[]>;
}
