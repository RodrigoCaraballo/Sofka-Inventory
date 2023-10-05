import {
  IProduct,
  RegisterProductData,
  RegisterProductInventoryStockData,
  RegisterSalesData,
} from '@Domain';
import {
  RabbitRegisterFinalCustomerSaleUseCase,
  RabbitRegisterProductInventoryStockUseCase,
  RabbitRegisterProductUpdateUseCase,
  RabbitRegisterProductUseCase,
  RabbitRegisterResellerSaleUseCase,
} from '@QueryApplication';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MessagingProductHandler {
  constructor(
    private readonly registerProductUseCase: RabbitRegisterProductUseCase,
    private readonly registerProductInventoryStockUseCase: RabbitRegisterProductInventoryStockUseCase,
    private readonly registerFinalCustomerSaleUseCase: RabbitRegisterFinalCustomerSaleUseCase,
    private readonly registerResellerSaleUseCase: RabbitRegisterResellerSaleUseCase,
    private readonly registerProductUpdateUseCase: RabbitRegisterProductUpdateUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_REGISTERED',
    queue: 'PRODUCT_REGISTERED',
  })
  registerProduct(dto: string): Observable<IProduct> {
    const product: RegisterProductData = JSON.parse(dto);

    return this.registerProductUseCase.execute(product);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_INVENTORY_STOCK_REGISTERED',
    queue: 'PRODUCT_INVENTORY_STOCK_REGISTERED',
  })
  registerProductInventoryStock(dto: string): Observable<IProduct> {
    const product: RegisterProductInventoryStockData = JSON.parse(dto);

    return this.registerProductInventoryStockUseCase.execute(product);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_FINAL_CUSTOMER_SALE_REGISTERED',
    queue: 'PRODUCT_FINAL_CUSTOMER_SALE_REGISTERED',
  })
  registerFinalCustomerSale(dto: string): Observable<IProduct[]> {
    const product: RegisterSalesData[] = JSON.parse(dto);
    return this.registerFinalCustomerSaleUseCase.execute(product);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_RESELLER_SALE_REGISTERED',
    queue: 'PRODUCT_RESELLER_SALE_REGISTERED',
  })
  registerResellerSale(dto: string): Observable<IProduct[]> {
    const product: RegisterSalesData[] = JSON.parse(dto);
    return this.registerResellerSaleUseCase.execute(product);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_UPDATED',
    queue: 'PRODUCT_UPDATED',
  })
  registerProductUpdate(dto: string): Observable<IProduct> {
    const product: RegisterProductData = JSON.parse(dto);
    return this.registerProductUpdateUseCase.execute(product);
  }
}
