import {
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
} from '@Application';
import { IProduct } from '@Interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
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
    return this.registerProductUseCase.execute(dto);
  }

  @Post('/inventory-stock')
  registerProductInventoryStock(
    @Body() dto: RegisterProductInventoryStockDTO,
  ): Observable<IProduct> {
    return this.registerProductInventoryStockUseCase.execute(dto);
  }

  @Post('/final-customer-sale')
  registerFinalCustomerSale(
    @Body() dto: RegisterSaleDTO,
  ): Observable<IProduct[]> {
    return this.registerFinalCustomerSaleUseCase.execute(dto);
  }

  @Post('/reseller-sale')
  registerResellerSale(@Body() dto: RegisterSaleDTO): Observable<IProduct[]> {
    return this.registerResellerSaleUseCase.execute(dto);
  }
}
