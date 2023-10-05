import { ISale, ISaleRepository } from '@Domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { SaleTypeOrmEntity } from '../model';

export class SaleTypeOrmRepository implements ISaleRepository {
  constructor(
    @InjectRepository(SaleTypeOrmEntity)
    private readonly saleRepository: Repository<SaleTypeOrmEntity>,
  ) {}

  saveSales(sales: ISale[]): Observable<ISale[]> {
    return from(this.saleRepository.save(sales));
  }
}
