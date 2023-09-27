import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Observable, from } from 'rxjs';
import { IProductRepository } from '../interfaces';
import { ProductTypeOrmEntity } from '../product.typeorm.entity';

@Injectable()
export class ProductTypeOrmRepository
  implements IProductRepository<ProductTypeOrmEntity>
{
  constructor(
    @InjectRepository(ProductTypeOrmEntity)
    private readonly productRepository: Repository<ProductTypeOrmEntity>,
  ) {}

  saveProduct(product: ProductTypeOrmEntity): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.save(product));
  }

  saveProducts(
    products: ProductTypeOrmEntity[],
  ): Observable<ProductTypeOrmEntity[]> {
    return from(this.productRepository.save(products));
  }

  findProductById(productId: string): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.findOne({ where: { productId } }));
  }

  findProductsById(productsId: string[]): Observable<ProductTypeOrmEntity[]> {
    return from(
      this.productRepository.find({
        where: {
          productId: In(productsId),
        },
      }),
    );
  }
}
