import {
  IBranch,
  IBranchRepository,
  IProduct,
  IProductRepository,
  RegisterProductData,
} from '@Domain';
import { Observable, switchMap } from 'rxjs';

export class RabbitRegisterProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly branchRepository: IBranchRepository,
  ) {}

  execute(data: RegisterProductData): Observable<IProduct> {
    return this.branchRepository.findBranchById(data.branchId).pipe(
      switchMap((branch: IBranch) => {
        return this.saveProduct(
          {
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
          },
          branch,
        );
      }),
    );
  }

  private saveProduct(
    product: IProduct,
    branch: IBranch,
  ): Observable<IProduct> {
    return this.productRepository.saveProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      inventoryStock: 0,
      category: product.category,
      branch: branch,
    });
  }
}
