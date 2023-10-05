import {
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
} from '@CommandApplication';
import {
  RegisterProductDTO,
  RegisterProductInventoryStockDTO,
  RegisterSaleDTO,
} from '@CommandInfrastructure';
import { CommandResponse } from '@Domain';
import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('api/v1/product')
export class CommandProductsController {
  constructor(
    private readonly registerProductUseCase: RegisterProductUseCase,
    private readonly registerProductInventoryStockUseCase: RegisterProductInventoryStockUseCase,
    private readonly registerFinalCustomerSaleUseCase: RegisterFinalCustomerSaleUseCase,
    private readonly registerResellerSaleUseCase: RegisterResellerSaleUseCase,
  ) {}

  @Post('/register')
  registerProduct(
    @Body() dto: RegisterProductDTO,
  ): Observable<CommandResponse> {
    return this.registerProductUseCase.execute(dto);
  }

  @Post('/purchase')
  registerProductInventoryStock(
    @Body() dto: RegisterProductInventoryStockDTO,
  ): Observable<CommandResponse> {
    return this.registerProductInventoryStockUseCase.execute(dto);
  }

  @Post('/customer-sale')
  registerFinalCustomerSale(
    @Body() dto: RegisterSaleDTO,
  ): Observable<CommandResponse> {
    return this.registerFinalCustomerSaleUseCase.execute(dto);
  }

  @Post('/reseller-sale')
  registerResellerSale(
    @Body() dto: RegisterSaleDTO,
  ): Observable<CommandResponse> {
    return this.registerResellerSaleUseCase.execute(dto);
  }
}
