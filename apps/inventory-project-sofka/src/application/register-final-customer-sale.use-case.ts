import {
  CommandResponse,
  ICommandBus,
  IEvent,
  IEventRepository,
  ISale,
  RegisterFinalCustomerSaleCommand,
  RegisterProductData,
  RegisterProductUpdated,
  RegisterSaleData,
  RegisterSalesData,
  SaleEntity,
} from '@Domain';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RegisterFinalCustomerSaleUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterSaleData): Observable<CommandResponse> {
    const productIds = data.products.map((product) => product.id);
    return this.eventRepository.findProducts(data.branchId, productIds).pipe(
      map((productsRegistered: IEvent[]) => {
        if (!productsRegistered || productsRegistered.length === 0)
          throw new NotFoundException('Product not registered');

        const productsUpdated = productsRegistered.map((productRegistered) => {
          const productParsed: RegisterProductData =
            productRegistered.eventData as RegisterProductData;

          const productDTO = data.products.find(
            (productSearch) => productSearch.id === productParsed.id,
          );
          if (
            productDTO &&
            productParsed.inventoryStock < productDTO.inventoryStock
          )
            throw new BadRequestException('Product inventory is not enough');

          productParsed.inventoryStock =
            productParsed.inventoryStock - productDTO.inventoryStock;

          return productParsed;
        });

        const productsSale = productsUpdated.map((productUpdated) => {
          const productDTO = data.products.find(
            (productSearch) => productSearch.id === productUpdated.id,
          );

          if (!productDTO)
            throw new BadRequestException('Product inventory is not enough');
          return {
            invoiceNumber: data.invoiceNumber,
            productName: productUpdated.name,
            productPrice: productUpdated.price,
            quantity: productDTO.inventoryStock,
          };
        });
        const newSales = this.validateEntity(productsSale, data.branchId);

        this.emitProductSale(newSales, data.branchId);
        this.emitProductUpdate(productsUpdated);
        return { statusCode: 200, success: true };
      }),
    );
  }

  private emitProductSale(datas: RegisterSalesData[], branchId: string): void {
    this.commandBus.publish(
      new RegisterFinalCustomerSaleCommand(branchId, JSON.stringify(datas)),
    );
  }

  private emitProductUpdate(datas: RegisterProductData[]): void {
    datas.forEach((data) => {
      this.commandBus.publish(
        new RegisterProductUpdated(data.branchId, JSON.stringify(data)),
      );
    });
  }

  private validateEntity(
    datas: ISale[],
    branchId: string,
  ): RegisterSalesData[] {
    return datas.map((data) => {
      const newProduct = new SaleEntity(data);

      return {
        id: newProduct.id.valueOf(),
        branchId: branchId,
        invoiceNumber: data.invoiceNumber.valueOf(),
        productName: newProduct.productName.valueOf(),
        productPrice: newProduct.productPrice.valueOf(),
        quantity: newProduct.quantity.valueOf(),
      };
    });
  }
}
