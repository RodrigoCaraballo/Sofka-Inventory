import { IBranch, IBranchRepository } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

export class GetBranchesUseCase {
  constructor(private readonly branchRepository: IBranchRepository) {}

  execute(): Observable<IBranch[]> {
    return this.branchRepository.findAllBranches().pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
