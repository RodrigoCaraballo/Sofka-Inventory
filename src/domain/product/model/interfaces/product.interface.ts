import { UUIDValueObject } from '../../../../domain/commons/value-objects';
import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductInventoryStockValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
} from '../value-objects';

export interface IProduct {
  productId?: UUIDValueObject;
  productName: ProductNameValueObject;
  productDescription: ProductDescriptionValueObject;
  productPrice: ProductPriceValueObject;
  productInventoryStock: ProductInventoryStockValueObject;
  productCategory: ProductCategoryValueObject;
}
