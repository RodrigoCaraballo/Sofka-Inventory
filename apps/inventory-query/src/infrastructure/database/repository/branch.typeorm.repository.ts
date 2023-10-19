import { IBranch, IBranchRepository } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from } from 'rxjs';
import { Repository } from 'typeorm';
import { BranchTypeOrmEntity } from '../model/branch.typeorm.entity';

export class BranchTypeOrmRepository implements IBranchRepository {
  constructor(
    @InjectRepository(BranchTypeOrmEntity)
    private readonly branchRepository: Repository<BranchTypeOrmEntity>,
  ) {}

  saveBranch(branch: IBranch): Observable<IBranch> {
    return from(this.branchRepository.save(branch)).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
  findBranchById(id: string): Observable<IBranch> {
    return from(
      this.branchRepository.findOne({
        where: { id },
        // relations: ['products', 'employees'],
      }),
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  findBranchByIdWithRelations(id: string): Observable<IBranch> {
    return from(
      this.branchRepository.findOne({
        where: { id },
        relations: ['products', 'employees'],
      }),
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  findAllBranches(): Observable<IBranch[]> {
    return from(this.branchRepository.find()).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
