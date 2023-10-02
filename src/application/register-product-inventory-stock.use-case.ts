import { RegisterProductInventoryStockCommand } from '@Command';
import {
  ICommandBus,
  IProduct,
  IProductRepository,
  RegisterProductInventoryStockData,
} from '@Interfaces';
import { ProductEntity } from '@Model';
import { Observable, switchMap } from 'rxjs';

export class RegisterProductInventoryStockUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterProductInventoryStockData): Observable<IProduct> {
    const dbProduct = this.productRepository.findProductById(data.id);
    return dbProduct.pipe(
      switchMap((product: IProduct) => {
        const productUpdated = this.updateProductStock(product, data);
        this.emitCommand(productUpdated);
        return this.saveProduct(productUpdated);
      }),
    );
  }

  private updateProductStock(
    product: IProduct,
    data: RegisterProductInventoryStockData,
  ): IProduct {
    product.inventoryStock = product.inventoryStock + data.inventoryStock;

    return this.validateEntity(product);
  }

  private emitCommand(product: IProduct): void {
    this.commandBus.publish(
      new RegisterProductInventoryStockCommand(
        product.branch.id,
        JSON.stringify(product),
      ),
    );
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
