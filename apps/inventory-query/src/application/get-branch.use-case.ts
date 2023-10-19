import { IBranch, IBranchRepository } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

export class GetBranchUseCase {
  constructor(private readonly branchRepository: IBranchRepository) {}

  execute(branchId: string): Observable<IBranch> {
    return this.branchRepository.findBranchByIdWithRelations(branchId).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
