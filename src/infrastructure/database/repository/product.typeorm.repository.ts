import { IProduct, IProductRepository } from '@Interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { In, Repository } from 'typeorm';
import { ProductTypeOrmEntity } from '../model';

@Injectable()
export class ProductTypeOrmRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductTypeOrmEntity)
    private readonly productRepository: Repository<ProductTypeOrmEntity>,
  ) {}

  saveProduct(product: IProduct): Observable<IProduct> {
    return from(this.productRepository.save(product));
  }

  saveProducts(products: IProduct[]): Observable<IProduct[]> {
    return from(this.productRepository.save(products));
  }

  findProductById(id: string): Observable<IProduct> {
    return from(
      this.productRepository.findOne({
        where: { id },
        relations: ['branch'],
      }),
    );
  }

  findProductsById(productsId: string[]): Observable<IProduct[]> {
    return from(
      this.productRepository.find({
        where: {
          id: In(productsId),
        },
        relations: ['branch'],
      }),
    );
  }
}
