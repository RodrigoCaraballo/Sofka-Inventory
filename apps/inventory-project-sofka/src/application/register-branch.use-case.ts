import {
  BranchEntity,
  IBranch,
  ICommandBus,
  RegisterBranchCommand,
  RegisterBranchData,
} from '@Domain';

export class RegisterBranchUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  execute(data: RegisterBranchData): void {
    const branch = this.validateEntity(data);

    this.commandBus.publish(
      new RegisterBranchCommand(branch.id, JSON.stringify(data)),
    );
  }

  private validateEntity(data: RegisterBranchData): IBranch {
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
