import { RegisterBranchCommand } from '@Command';
import { IBranch, IBranchRepository, RegisterBranchData } from '@Interfaces';
import { BranchEntity } from '@Model';
import { CommandBus } from '@nestjs/cqrs';
import { Observable } from 'rxjs';

export class RegisterBranchUseCase {
  constructor(
    private readonly branchRepository: IBranchRepository,
    private readonly commandBus: CommandBus,
  ) {}

  execute(data: RegisterBranchData): Observable<IBranch> {
    const branch = this.createValueObject(data);

    this.commandBus.execute(
      new RegisterBranchCommand(branch.id, JSON.stringify(data)),
    );
    return this.createBranch(branch);
  }

  private createBranch(branch: IBranch): Observable<IBranch> {
    return this.branchRepository.saveBranch({
      id: branch.id,
      name: branch.name,
      country: branch.country,
      city: branch.city,
      products: branch.products,
      employees: branch.employees,
    });
  }

  private createValueObject(data: RegisterBranchData): IBranch {
    const newBranch = new BranchEntity({
      name: data.name,
      country: data.country,
      city: data.city,
      products: [],
      employees: [],
    });

    return {
      id: newBranch.id.valueOf(),
      name: newBranch.name.valueOf(),
      country: newBranch.location.valueOf().country,
      city: newBranch.location.valueOf().city,
      products: newBranch.products,
      employees: newBranch.employees,
    };
  }
}
