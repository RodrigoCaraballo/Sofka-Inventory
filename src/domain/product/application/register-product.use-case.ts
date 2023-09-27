import { Inject, Injectable } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { BranchTypeOrmEntity } from '../../../domain/branch/model/branch.typeorm.entity';
import {
  IBranch,
  IBranchRepository,
} from '../../../domain/branch/model/interfaces';
import { BranchTypeOrmRepository } from '../../../domain/branch/model/repository';
import { UUIDValueObject } from '../../../domain/commons/value-objects';
import {
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../lib/sofka';
import { RegisterProductDTO } from '../infrastructure/dto';
import {
  IProduct,
  IProductRepository,
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductEntity,
  ProductInventoryStockValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductTypeOrmEntity,
  ProductTypeOrmRepository,
} from '../model';

@Injectable()
export class RegisterProductUseCase extends ValueObjectErrorHandler {
  constructor(
    @Inject(BranchTypeOrmRepository)
    private readonly branchRepository: IBranchRepository<BranchTypeOrmEntity>,
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository<ProductTypeOrmEntity>,
  ) {
    super();
  }

  execute(data: RegisterProductDTO): Observable<IProduct> {
    const { branchId } = data;
    return this.branchRepository.findBranchById(branchId).pipe(
      switchMap((branch: BranchTypeOrmEntity) => {
        const product = this.createValueObject(
          data,
          branch as unknown as IBranch,
        );

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
    ) as unknown as Observable<IProduct>;
  }

  createValueObject(data: RegisterProductDTO, branch: IBranch): IProduct {
    const {
      productName,
      productDescription,
      productPrice,
      productInventoryStock,
      productCategory,
    } = data;

    const productNameVO = new ProductNameValueObject(productName);
    const productDescriptionVO = new ProductDescriptionValueObject(
      productDescription,
    );
    const productPriceVO = new ProductPriceValueObject(productPrice);
    const productInventoryStockVO = new ProductInventoryStockValueObject(
      productInventoryStock,
    );
    const productCategoryVO = new ProductCategoryValueObject(productCategory);

    const newProduct = new ProductEntity({
      productName: productNameVO,
      productDescription: productDescriptionVO,
      productPrice: productPriceVO,
      productInventoryStock: productInventoryStockVO,
      productCategory: productCategoryVO,
    });

    this.validateValueObject(newProduct);

    return newProduct;
  }

  validateValueObject(valueObject: IProduct): void {
    const {
      productId,
      productName,
      productDescription,
      productPrice,
      productInventoryStock,
      productCategory,
    } = valueObject;

    if (productId instanceof UUIDValueObject && productId.hasErrors())
      this.setErrors(productId.getErrors());
    if (
      productName instanceof ProductNameValueObject &&
      productName.hasErrors()
    )
      this.setErrors(productName.getErrors());
    if (
      productDescription instanceof ProductDescriptionValueObject &&
      productDescription.hasErrors()
    )
      this.setErrors(productDescription.getErrors());
    if (
      productPrice instanceof ProductPriceValueObject &&
      productPrice.hasErrors()
    )
      this.setErrors(productPrice.getErrors());
    if (
      productInventoryStock instanceof ProductInventoryStockValueObject &&
      productInventoryStock.hasErrors()
    )
      this.setErrors(productInventoryStock.getErrors());
    if (
      productCategory instanceof ProductCategoryValueObject &&
      productCategory.hasErrors()
    )
      this.setErrors(productCategory.getErrors());

    if (this.hasErrors())
      throw new ValueObjectException(
        'RegisterProductUseCase Has Errors',
        this.getErrors(),
      );
  }
}
