import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '../interfaces/model';
import { ProductCategoryValueObject } from '../value-object/product-category.value-object';
import { ProductDescriptionValueObject } from '../value-object/product-description.value-object';
import { ProductInventoryStockValueObject } from '../value-object/product-inventory-stock.value-object';
import { ProductNameValueObject } from '../value-object/product-name.value-object';
import { ProductPriceValueObject } from '../value-object/product-price.value-object';
import { UUIDValueObject } from '../value-object/uuid.value-object';

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
