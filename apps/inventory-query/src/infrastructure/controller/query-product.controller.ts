import {
  IProduct,
  RegisterProductData,
  RegisterProductInventoryStockData,
  RegisterSaleData,
} from '@Domain';
import {
  RabbitRegisterFinalCustomerSaleUseCase,
  RabbitRegisterProductInventoryStockUseCase,
  RabbitRegisterProductUseCase,
  RabbitRegisterResellerSaleUseCase,
} from '@QueryApplication';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api/v1/product')
export class QueryProductsController {
  constructor(
    private readonly registerProductUseCase: RabbitRegisterProductUseCase,
    private readonly registerProductInventoryStockUseCase: RabbitRegisterProductInventoryStockUseCase,
    private readonly registerFinalCustomerSaleUseCase: RabbitRegisterFinalCustomerSaleUseCase,
    private readonly registerResellerSaleUseCase: RabbitRegisterResellerSaleUseCase,
  ) {}

  @EventPattern('PRODUCT_REGISTERED')
  registerProduct(@Payload() dto: string): Observable<IProduct> {
    const product: RegisterProductData = JSON.parse(dto);
    return this.registerProductUseCase.execute(product);
  }

  @EventPattern('PRODUCT_INVENTORY_STOCK_REGISTERED')
  registerProductInventoryStock(@Payload() dto: string): Observable<IProduct> {
    const product: RegisterProductInventoryStockData = JSON.parse(dto);

    return this.registerProductInventoryStockUseCase.execute(product);
  }

  @EventPattern('PRODUCT_FINAL_CUSTOMER_SALE_REGISTERED')
  registerFinalCustomerSale(@Payload() dto: string): Observable<IProduct[]> {
    const product: RegisterSaleData = JSON.parse(dto);
    return this.registerFinalCustomerSaleUseCase.execute(product);
  }

  @EventPattern('PRODUCT_RESELLER_SALE_REGISTERED')
  registerResellerSale(@Payload() dto: string): Observable<IProduct[]> {
    const product: RegisterSaleData = JSON.parse(dto);
    return this.registerResellerSaleUseCase.execute(product);
  }
}
