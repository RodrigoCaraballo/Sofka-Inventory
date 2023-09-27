import { Observable, switchMap } from 'rxjs';
import { ValueObjectErrorHandler } from '../../../lib/sofka';
import { IBranch, IBranchRepository } from '../../branch/domain/interfaces';
import { IProduct, IProductRepository, ProductEntity } from '../domain';
import { RegisterProductDTO } from '../infrastructure/dto';

export class RegisterProductUseCase extends ValueObjectErrorHandler {
  constructor(
    private readonly branchRepository: IBranchRepository,
    private readonly productRepository: IProductRepository,
  ) {
    super();
  }

  execute(data: RegisterProductDTO): Observable<IProduct> {
    const { branchId } = data;
    return this.branchRepository.findBranchById(branchId).pipe(
      switchMap((branch: IBranch) => {
        const product = this.createValueObject(data, branch);

        return this.productRepository.saveProduct({
          productId: product.productId.valueOf(),
          productName: product.productName.valueOf(),
          productDescription: product.productDescription.valueOf(),
          productPrice: product.productPrice.valueOf(),
          productInventoryStock: product.productInventoryStock.valueOf(),
          productCategory: product.productCategory.valueOf(),
          productBranch: branch,
        });
      }),
    );
  }

  createValueObject(data: RegisterProductDTO, branch: IBranch): IProduct {
    const newProduct = new ProductEntity({
      productName: data.productName,
      productDescription: data.productDescription,
      productPrice: data.productPrice,
      productInventoryStock: data.productInventoryStock,
      productCategory: data.productCategory,
      productBranch: branch,
    });

    return {
      productId: newProduct.productId.valueOf(),
      productName: newProduct.productName.valueOf(),
      productDescription: newProduct.productDescription.valueOf(),
      productPrice: newProduct.productPrice.valueOf(),
      productInventoryStock: newProduct.productInventoryStock.valueOf(),
      productCategory: newProduct.productCategory.valueOf(),
      productBranch: branch,
    };
  }
}
