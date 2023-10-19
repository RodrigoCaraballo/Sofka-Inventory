import { IProduct, IProductRepository } from '@Domain';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from } from 'rxjs';
import { In, Repository } from 'typeorm';
import { ProductTypeOrmEntity } from '../model';

@Injectable()
export class ProductTypeOrmRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductTypeOrmEntity)
    private readonly productRepository: Repository<ProductTypeOrmEntity>,
  ) {}

  saveProduct(product: IProduct): Observable<IProduct> {
    return from(this.productRepository.save(product)).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  saveProducts(products: IProduct[]): Observable<IProduct[]> {
    return from(this.productRepository.save(products)).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  findProductById(id: string): Observable<IProduct> {
    return from(
      this.productRepository.findOne({
        where: { id },
        relations: ['branch'],
      }),
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
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
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
