import {
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
} from '@Application';
import { IProduct } from '@Interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, tap } from 'rxjs';
import { RegisterProductInventoryStockDTO } from '../dto/register-product-inventory-stock.dto';
import { RegisterProductDTO } from '../dto/register-product.dto';
import { RegisterSaleDTO } from '../dto/register-sale.dto';

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
