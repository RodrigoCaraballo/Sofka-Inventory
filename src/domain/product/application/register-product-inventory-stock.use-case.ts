import { Inject, Injectable } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import {
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../lib/sofka';
import { RegisterProductInventoryStockDTO } from '../infrastructure/dto';
import {
  IProduct,
  IProductRepository,
  ProductInventoryStockValueObject,
  ProductTypeOrmEntity,
  ProductTypeOrmRepository,
} from '../model';

@Injectable()
export class RegisterProductInventoryStockUseCase extends ValueObjectErrorHandler {
  constructor(
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository<ProductTypeOrmEntity>,
  ) {
    super();
  }

  execute(data: RegisterProductInventoryStockDTO): Observable<IProduct> {
    const dbProduct = this.productRepository.findProductById(data.productId);

    return dbProduct.pipe(
      switchMap((product: ProductTypeOrmEntity) => {
        const productInventoryStockVO = this.createValueObject(
          data.productStock + product.productInventoryStock,
        );

        this.validateValueObject(productInventoryStockVO);

        const newProduct = {
          ...product,
          productInventoryStock: productInventoryStockVO.valueOf(),
        };

        return this.productRepository.saveProduct(newProduct);
      }),
    ) as unknown as Observable<IProduct>;
  }

  createValueObject(stock: number): ProductInventoryStockValueObject {
    const productInventoryStockVO = new ProductInventoryStockValueObject(stock);

    return productInventoryStockVO;
  }

  validateValueObject(valueObject: ProductInventoryStockValueObject): void {
    if (
      valueObject instanceof ProductInventoryStockValueObject &&
      valueObject.hasErrors()
    )
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors())
      throw new ValueObjectException(
        'RegisterProductInventoryStockUseCase Has Errors',
        this.getErrors(),
      );
  }
}
