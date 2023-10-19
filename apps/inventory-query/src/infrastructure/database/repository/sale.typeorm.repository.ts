import { ISale, ISaleRepository } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from } from 'rxjs';
import { Repository } from 'typeorm';
import { SaleTypeOrmEntity } from '../model';

export class SaleTypeOrmRepository implements ISaleRepository {
  constructor(
    @InjectRepository(SaleTypeOrmEntity)
    private readonly saleRepository: Repository<SaleTypeOrmEntity>,
  ) {}
  findSales(branchId: string): Observable<ISale[]> {
    return from(
      this.saleRepository.find({
        where: { branch: { id: branchId }, activated: true },
      }),
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  saveSales(sales: ISale[]): Observable<ISale[]> {
    return from(this.saleRepository.save(sales)).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  findSaleByInvoiceNumberAndProductId(
    invoiceNumber: string,
    id: string,
  ): Observable<ISale> {
    return from(
      this.saleRepository.findOne({
        where: {
          invoiceNumber,
          id,
        },
      }),
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
  saveSale(sale: ISale): Observable<ISale> {
    return from(this.saleRepository.save(sale)).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
