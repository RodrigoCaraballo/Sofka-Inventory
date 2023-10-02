import { IBranch, IBranchRepository, RegisterBranchData } from '@Domain';
import { Observable } from 'rxjs';

export class RabbitRegisterBranchUseCase {
  constructor(private readonly branchRepository: IBranchRepository) {}

  execute(data: RegisterBranchData): Observable<IBranch> {
    const newBranch: IBranch = {
      id: data.id,
      name: data.name,
      country: data.country,
      city: data.city,
      products: [],
      employees: [],
    };

    return this.registerBranch(newBranch);
  }

  private registerBranch(branch: IBranch): Observable<IBranch> {
    return this.branchRepository.saveBranch({
      id: branch.id,
      name: branch.name,
      country: branch.country,
      city: branch.city,
      products: branch.products,
      employees: branch.employees,
    });
  }
}
