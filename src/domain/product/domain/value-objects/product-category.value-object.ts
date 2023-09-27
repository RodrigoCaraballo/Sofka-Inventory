import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

enum CATEGORY_ENUM {
  Hand_Tools = 'hand tools',
  Power_Tools = 'power tools',
  Locksmithing = 'locksmithing',
  Construction_Hardware = 'construction hardware',
  Paint_and_Accessories = 'paint and accessories',
  Gardening_and_Outdoors = 'gardening and outdoors',
  Safety_and_Protective_Equipment = 'safety and protection equipment',
  Plumbing_Supplies = 'plumbing supplies',
  Electrical = 'electrical',
  Home_Fixtures = 'home fixtures',
  Others = 'others',
}

export class ProductCategoryValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.isIntoEnum();
  }

  isIntoEnum(): void {
    if (
      !Object.values(CATEGORY_ENUM)
        .toString()
        .includes(this.value.toLowerCase())
    ) {
      const error: IErrorValueObject = {
        field: 'ProductCategory',
        message: 'Product Category is not a valid value',
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
