import { RegisterBranchDTO } from '@DTO';
import {
  IBranch,
  IBranchRepository,
  IUser,
  IUserRepository,
} from '@Interfaces';
import { BranchEntity } from '@Model';
import { Observable, switchMap, tap } from 'rxjs';

export class RegisterBranchUseCase {
  constructor(
    private readonly branchRepository: IBranchRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  execute(data: RegisterBranchDTO): Observable<IBranch> {
    const { userId } = data;

    const user = this.getUser(userId);
    const branch = user.pipe(
      switchMap((user: IUser) => {
        const newBranch = this.createValueObject(data, user);
        return this.createBranch(newBranch);
      }),
    );

    branch.pipe(
      tap((branch: IBranch) => {
        return user.pipe(
          tap((user: IUser) => {
            user.userBranch = branch;
            this.updateUserWithBranch(user);
          }),
        );
      }),
    );

    return branch as unknown as Observable<IBranch>;
  }

  private getUser(userId: string): Observable<IUser> {
    return this.userRepository.findUserById(userId);
  }

  private createBranch(branch: IBranch): Observable<IBranch> {
    return this.branchRepository.saveBranch({
      branchId: branch.branchId,
      branchName: branch.branchName,
      branchCountry: branch.branchCountry,
      branchCity: branch.branchCity,
      branchProducts: branch.branchProducts,
      branchEmployees: branch.branchEmployees,
    });
  }

  private updateUserWithBranch(user: IUser): void {
    this.userRepository.saveUser(user);
  }

  private createValueObject(data: RegisterBranchDTO, user: IUser): IBranch {
    const newBranch = new BranchEntity({
      branchName: data.branchName,
      branchCountry: data.branchCountry,
      branchCity: data.branchCity,
      branchProducts: [],
      branchEmployees: [user],
    });

    return {
      branchId: newBranch.branchId.valueOf(),
      branchName: newBranch.branchName.valueOf(),
      branchCountry: newBranch.branchLocation.valueOf().country,
      branchCity: newBranch.branchLocation.valueOf().city,
      branchProducts: newBranch.branchProducts,
      branchEmployees: newBranch.branchEmployees,
    };
  }
}
