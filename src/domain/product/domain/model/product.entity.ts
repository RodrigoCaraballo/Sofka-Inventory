import { v4 as uuidv4 } from 'uuid';

import { UUIDValueObject } from '../../../commons/domain/value-objects';
import { IProduct } from '../interfaces';
import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductInventoryStockValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
} from '../value-objects';

export class ProductEntity {
  productId: UUIDValueObject;
  productName: ProductNameValueObject;
  productDescription: ProductDescriptionValueObject;
  productPrice: ProductPriceValueObject;
  productInventoryStock: ProductInventoryStockValueObject;
  productCategory: ProductCategoryValueObject;

  constructor(data: IProduct) {
    if (data.productId) this.productId = new UUIDValueObject(data.productId);
    else this.productId = new UUIDValueObject(uuidv4());

    this.productName = new ProductNameValueObject(data.productName);
    this.productDescription = new ProductDescriptionValueObject(
      data.productDescription,
    );
    this.productPrice = new ProductPriceValueObject(data.productPrice);
    this.productInventoryStock = new ProductInventoryStockValueObject(
      data.productInventoryStock,
    );
    this.productCategory = new ProductCategoryValueObject(data.productCategory);
  }
}
