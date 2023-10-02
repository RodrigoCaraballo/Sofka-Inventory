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
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/v1/product')
export class CommandProductsController {
  constructor(
    private readonly registerProductUseCase: RegisterProductUseCase,
    private readonly registerProductInventoryStockUseCase: RegisterProductInventoryStockUseCase,
    private readonly registerFinalCustomerSaleUseCase: RegisterFinalCustomerSaleUseCase,
    private readonly registerResellerSaleUseCase: RegisterResellerSaleUseCase,
  ) {}

  @Post('/register')
  registerProduct(@Body() dto: RegisterProductDTO): void {
    this.registerProductUseCase.execute(dto);
  }

  @Post('/purchase')
  registerProductInventoryStock(
    @Body() dto: RegisterProductInventoryStockDTO,
  ): void {
    this.registerProductInventoryStockUseCase.execute(dto);
  }

  @Post('/customer-sale')
  registerFinalCustomerSale(@Body() dto: RegisterSaleDTO): void {
    this.registerFinalCustomerSaleUseCase.execute(dto);
  }

  @Post('/reseller-sale')
  registerResellerSale(@Body() dto: RegisterSaleDTO): void {
    this.registerResellerSaleUseCase.execute(dto);
  }
}
