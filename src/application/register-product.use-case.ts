import { RegisterProductCommand } from '@Command';
import {
  IBranch,
  IBranchRepository,
  ICommandBus,
  IProduct,
  IProductRepository,
  RegisterProductData,
} from '@Interfaces';
import { ProductEntity } from '@Model';
import { Observable, switchMap } from 'rxjs';

export class RegisterProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly branchRepository: IBranchRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterProductData): Observable<IProduct> {
    return this.branchRepository.findBranchById(data.branchId).pipe(
      switchMap((branch: IBranch) => {
        const product = this.validateEntity(data, branch);
        this.emitCommand(product, data.branchId);
        return this.saveProduct(product, branch);
      }),
    );
  }

  private emitCommand(product: IProduct, branchId: string): void {
    this.commandBus.publish(
      new RegisterProductCommand(branchId, JSON.stringify(product)),
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

  private validateEntity(data: RegisterProductData, branch: IBranch): IProduct {
    const newProduct = new ProductEntity({
      name: data.name,
      description: data.description,
      price: data.price,
      inventoryStock: 0,
      category: data.category,
      branch: branch,
    });

    return {
      id: newProduct.id.valueOf(),
      name: newProduct.name.valueOf(),
      description: newProduct.description.valueOf(),
      price: newProduct.price.valueOf(),
      inventoryStock: newProduct.inventoryStock.valueOf(),
      category: newProduct.category.valueOf(),
      branch: branch,
    };
  }
}
