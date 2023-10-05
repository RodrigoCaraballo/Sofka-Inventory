import { v4 as uuidv4 } from 'uuid';
import { ISale } from '../interfaces';
import {
  InvoiceNumberValueObject,
  ProductInventoryStockValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  UUIDValueObject,
} from '../value-object';

export class SaleEntity {
  id?: UUIDValueObject;
  productName: ProductNameValueObject;
  invoiceNumber: InvoiceNumberValueObject;
  productPrice: ProductPriceValueObject;
  quantity: ProductInventoryStockValueObject;

  constructor(data: ISale) {
    if (data.id) this.id = new UUIDValueObject(data.id);
    else this.id = new UUIDValueObject(uuidv4());

    this.productName = new ProductNameValueObject(data.productName);
    this.invoiceNumber = new InvoiceNumberValueObject(data.invoiceNumber);
    this.productPrice = new ProductPriceValueObject(data.productPrice);
    this.quantity = new ProductInventoryStockValueObject(data.quantity);
  }
}
