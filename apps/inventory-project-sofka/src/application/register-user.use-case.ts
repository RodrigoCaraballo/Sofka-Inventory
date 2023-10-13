import {
  CommandResponse,
  ICommandBus,
  IEvent,
  IEventRepository,
  RegisterUserCommand,
  RegisterUserData,
  UserEntity,
} from '@Domain';
import { BadRequestException } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RegisterUserUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterUserData): Observable<CommandResponse> {
    return this.eventRepository.existUser(data.email).pipe(
      map((userRegistered: IEvent) => {
        if (userRegistered)
          throw new BadRequestException('Email already registered');
        this.validateEntity(data);
        this.emitCommand(data);
        return { statusCode: 200, success: true };
      }),
    );
  }

  private emitCommand(data: RegisterUserData): void {
    this.commandBus.publish(
      new RegisterUserCommand(data.branchId, JSON.stringify(data)),
    );
  }

  private validateEntity(data: RegisterUserData): RegisterUserData {
    const newUser = new UserEntity(data);

    return {
      id: newUser.id.valueOf(),
      name: newUser.name.valueOf().userName,
      lastName: newUser.name.valueOf().userLastName,
      password: newUser.password.valueOf(),
      email: newUser.email.valueOf(),
      role: newUser.role.valueOf(),
      branchId: data.branchId,
    };
  }
}
