import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, tap } from 'rxjs';
import {
  RegisterFinalCustomerSaleUseCase,
  RegisterResellerSaleUseCase,
} from '../../application';
import { RegisterProductInventoryStockUseCase } from '../../application/register-product-inventory-stock.use-case';
import { RegisterProductUseCase } from '../../application/register-product.use-case';
import { IProduct } from '../../domain';
import {
  RegisterProductDTO,
  RegisterProductInventoryStockDTO,
  RegisterSaleDTO,
} from '../dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly registerProductUseCase: RegisterProductUseCase,
    private readonly registerProductInventoryStockUseCase: RegisterProductInventoryStockUseCase,
    private readonly registerFinalCustomerSaleUseCase: RegisterFinalCustomerSaleUseCase,
    private readonly registerResellerSaleUseCase: RegisterResellerSaleUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  registerProduct(@Body() dto: RegisterProductDTO): Observable<IProduct> {
    return this.registerProductUseCase.execute(dto).pipe(
      tap((product: IProduct) =>
        this.eventEmitter.emit('register-event', {
          eventType: 'PRODUCT_REGISTERED',
          eventData: JSON.stringify({
            productId: product.productId,
            productName: product.productName,
            productDescription: product.productDescription,
            productCategory: product.productCategory,
            productPrice: product.productPrice,
            productInventoryStock: product.productInventoryStock,
            productBranch: product.productBranch.branchId,
          }),
        }),
      ),
    );
  }

  @Post('/inventory-stock')
  registerProductInventoryStock(
    @Body() dto: RegisterProductInventoryStockDTO,
  ): Observable<IProduct> {
    return this.registerProductInventoryStockUseCase.execute(dto).pipe(
      tap((product: IProduct) =>
        this.eventEmitter.emit('register-event', {
          eventType: 'PRODUCT_INVENTORY_STOCK_REGISTERED',
          eventData: JSON.stringify(product),
        }),
      ),
    );
  }

  @Post('/final-customer-sale')
  registerFinalCustomerSale(
    @Body() dto: RegisterSaleDTO,
  ): Observable<RegisterSaleDTO> {
    return this.registerFinalCustomerSaleUseCase.execute(dto).pipe(
      tap((products: RegisterSaleDTO) =>
        this.eventEmitter.emit('register-event', {
          eventType: 'FINAL_CUSTOMER_SALE_REGISTERED',
          eventData: JSON.stringify(products),
        }),
      ),
    );
  }

  @Post('/reseller-sale')
  registerResellerSale(
    @Body() dto: RegisterSaleDTO,
  ): Observable<RegisterSaleDTO> {
    return this.registerResellerSaleUseCase.execute(dto).pipe(
      tap((products: RegisterSaleDTO) =>
        this.eventEmitter.emit('register-event', {
          eventType: 'RESELLER_SALE_REGISTERED',
          eventData: JSON.stringify(products),
        }),
      ),
    );
  }
}
