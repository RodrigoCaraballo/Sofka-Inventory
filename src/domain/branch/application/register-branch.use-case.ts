import { Inject } from '@nestjs/common';
import { Observable, switchMap, tap } from 'rxjs';
import { ProductTypeOrmEntity } from 'src/domain/product/model';
import { UUIDValueObject } from '../../../domain/commons/value-objects';
import { IUser, IUserRepository } from '../../../domain/user/model/interfaces';
import { UserTypeOrmRepository } from '../../../domain/user/model/repository/user.typeorm.repository';
import { UserTypeOrmEntity } from '../../../domain/user/model/user.typeorm.entity';
import {
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../lib/sofka';
import { RegisterBranchDTO } from '../infrastructure/dto';
import { BranchEntity } from '../model/branch.enity';
import { BranchTypeOrmEntity } from '../model/branch.typeorm.entity';
import { IBranch, IBranchRepository } from '../model/interfaces';
import { BranchTypeOrmRepository } from '../model/repository';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '../model/value-object';

export class RegisterBranchUseCase extends ValueObjectErrorHandler {
  constructor(
    @Inject(BranchTypeOrmRepository)
    private readonly branchRepository: IBranchRepository<BranchTypeOrmEntity>,
    @Inject(UserTypeOrmRepository)
    private readonly userRepository: IUserRepository<UserTypeOrmEntity>,
  ) {
    super();
  }

  execute(data: RegisterBranchDTO): Observable<IBranch> {
    const { userId } = data;

    const user = this.getUser(userId);
    const branch = user.pipe(
      switchMap((user: UserTypeOrmEntity) => {
        const newBranch = this.createValueObject(
          data,
          user as unknown as IUser,
        );
        return this.createBranch(newBranch);
      }),
    );

    branch.pipe(
      tap((branch: BranchTypeOrmEntity) => {
        return user.pipe(
          tap((user: UserTypeOrmEntity) => {
            user.userBranch = branch;
            this.updateUserWithBranch(user);
          }),
        );
      }),
    );

    return branch as unknown as Observable<IBranch>;
  }

  private getUser(userId: string): Observable<UserTypeOrmEntity> {
    return this.userRepository.findUserById(userId);
  }

  private createBranch(branch: IBranch): Observable<BranchTypeOrmEntity> {
    return this.branchRepository.saveBranch({
      branchId: branch.branchId.valueOf(),
      branchName: branch.branchName.valueOf(),
      branchCountry: branch.branchLocation.valueOf().country,
      branchCity: branch.branchLocation.valueOf().city,
      branchProducts:
        branch.branchProducts as unknown as ProductTypeOrmEntity[],
      branchEmployees: branch.branchEmployees as unknown as UserTypeOrmEntity[],
    });
  }

  private updateUserWithBranch(user: UserTypeOrmEntity): void {
    this.userRepository.saveUser(user);
  }

  private createValueObject(data: RegisterBranchDTO, user: IUser): IBranch {
    const { branchName, branchCountry, branchCity } = data;

    const branchNameVO = new BranchNameValueObject(branchName);
    const branchLocationVO = new BranchLocationValueObject({
      country: branchCountry,
      city: branchCity,
    });

    const newBranch = new BranchEntity({
      branchName: branchNameVO,
      branchLocation: branchLocationVO,
      branchProducts: [],
      branchEmployees: [user],
    });

    this.validateValueObject(newBranch);

    return newBranch;
  }

  private validateValueObject(valueObject: IBranch): void {
    const { branchId, branchName, branchLocation } = valueObject;

    if (branchId instanceof UUIDValueObject && branchId.hasErrors())
      this.setErrors(branchId.getErrors());
    if (branchName instanceof BranchNameValueObject && branchName.hasErrors())
      this.setErrors(branchName.getErrors());
    if (
      branchLocation instanceof BranchLocationValueObject &&
      branchLocation.hasErrors()
    )
      this.setErrors(branchLocation.getErrors());

    if (this.hasErrors())
      throw new ValueObjectException(
        'RegisterBranchUseCase Has Errors',
        this.getErrors(),
      );
  }
}
