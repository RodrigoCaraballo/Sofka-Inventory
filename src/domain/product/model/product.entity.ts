import { v4 as uuidv4 } from 'uuid';

import { UUIDValueObject } from '../../../domain/commons/value-objects';
import { IProduct } from './interfaces';
import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductInventoryStockValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
} from './value-objects';

export class ProductEntity implements IProduct {
  productId: UUIDValueObject;
  productName: ProductNameValueObject;
  productDescription: ProductDescriptionValueObject;
  productPrice: ProductPriceValueObject;
  productInventoryStock: ProductInventoryStockValueObject;
  productCategory: ProductCategoryValueObject;

  constructor(data: IProduct) {
    if (data.productId) this.productId = data.productId;
    else this.productId = new UUIDValueObject(uuidv4());

    this.productName = data.productName;
    this.productDescription = data.productDescription;
    this.productPrice = data.productPrice;
    this.productInventoryStock = data.productInventoryStock;
    this.productCategory = data.productCategory;
  }
}
