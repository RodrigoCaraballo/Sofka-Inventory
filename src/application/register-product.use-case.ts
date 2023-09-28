import { RegisterProductDTO } from '@DTO';
import {
  IBranch,
  IBranchRepository,
  IProduct,
  IProductRepository,
} from '@Interfaces';
import { ProductEntity } from '@Model';
import { Observable, switchMap } from 'rxjs';

export class RegisterProductUseCase {
  constructor(
    private readonly branchRepository: IBranchRepository,
    private readonly productRepository: IProductRepository,
  ) {}

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
