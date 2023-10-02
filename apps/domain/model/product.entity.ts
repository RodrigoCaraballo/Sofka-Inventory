import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '../interfaces/model';
import { ProductCategoryValueObject } from '../value-object/product-category.value-object';
import { ProductDescriptionValueObject } from '../value-object/product-description.value-object';
import { ProductInventoryStockValueObject } from '../value-object/product-inventory-stock.value-object';
import { ProductNameValueObject } from '../value-object/product-name.value-object';
import { ProductPriceValueObject } from '../value-object/product-price.value-object';
import { UUIDValueObject } from '../value-object/uuid.value-object';

export class ProductEntity {
  id: UUIDValueObject;
  name: ProductNameValueObject;
  description: ProductDescriptionValueObject;
  price: ProductPriceValueObject;
  inventoryStock: ProductInventoryStockValueObject;
  category: ProductCategoryValueObject;

  constructor(data: IProduct) {
    if (data.id) this.id = new UUIDValueObject(data.id);
    else this.id = new UUIDValueObject(uuidv4());

    this.name = new ProductNameValueObject(data.name);
    this.description = new ProductDescriptionValueObject(data.description);
    this.price = new ProductPriceValueObject(data.price);
    this.inventoryStock = new ProductInventoryStockValueObject(
      data.inventoryStock,
    );
    this.category = new ProductCategoryValueObject(data.category);
  }
}
