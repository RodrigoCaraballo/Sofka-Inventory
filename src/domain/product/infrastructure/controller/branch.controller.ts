import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  RegisterFinalCustomerSaleUseCase,
  RegisterResellerSaleUseCase,
} from '../../application';
import { RegisterProductInventoryStockUseCase } from '../../application/register-product-inventory-stock.use-case';
import { RegisterProductUseCase } from '../../application/register-product.use-case';
import { IProduct } from '../../model';
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
