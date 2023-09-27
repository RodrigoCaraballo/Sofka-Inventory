import { BadRequestException, Inject } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import {
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../lib/sofka';
import { RegisterSaleDTO } from '../infrastructure/dto';
import {
  IProduct,
  IProductRepository,
  ProductInventoryStockValueObject,
  ProductTypeOrmEntity,
  ProductTypeOrmRepository,
} from '../model';

export class RegisterResellerSaleUseCase extends ValueObjectErrorHandler {
  constructor(
    @Inject(ProductTypeOrmRepository)
    private readonly productRepository: IProductRepository<ProductTypeOrmEntity>,
  ) {
    super();
  }

  execute(data: RegisterSaleDTO): Observable<IProduct[]> {
    const productsId = data.products.map((product) => product.productId);
    const dbProduct = this.productRepository.findProductsById(productsId);

    return dbProduct.pipe(
      map((products: ProductTypeOrmEntity[]) => {
        const newProducts = products.map((product) => {
          const findProduct = data.products.find(
            (dataProduct) => dataProduct.productId === product.productId,
          );

          if (!findProduct) return product;

          if (product.productInventoryStock < findProduct.productStock)
            throw new BadRequestException('Product Inventory Stock not enough');

          const productInventoryStockVO = this.createValueObject(
            product.productInventoryStock - findProduct.productStock,
          );

          this.validateValueObject(productInventoryStockVO);

          return {
            ...product,
            productInventoryStock: productInventoryStockVO.valueOf(),
          };
        });

        return this.productRepository.saveProducts(newProducts);
      }),
    ) as unknown as Observable<IProduct[]>;
  }

  private createValueObject(stock: number): ProductInventoryStockValueObject {
    const productInventoryStockVO = new ProductInventoryStockValueObject(stock);

    return productInventoryStockVO;
  }

  private validateValueObject(
    valueObject: ProductInventoryStockValueObject,
  ): void {
    if (
      valueObject instanceof ProductInventoryStockValueObject &&
      valueObject.hasErrors()
    )
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors())
      throw new ValueObjectException(
        'RegisterFinalCustomerSaleUseCase Has Errors',
        this.getErrors(),
      );
  }
}
