import {
  BranchEntity,
  CommandResponse,
  IBranch,
  ICommandBus,
  IEvent,
  IEventRepository,
  RegisterBranchCommand,
  RegisterBranchData,
} from '@Domain';
import { BadRequestException } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RegisterBranchUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterBranchData): Observable<CommandResponse> {
    return this.eventRepository.existBranch(data).pipe(
      map((event: IEvent) => {
        if (event) throw new BadRequestException('Branch already exists');
        const branch = this.validateEntity(data);

        this.commandBus.publish(
          new RegisterBranchCommand(branch.id, JSON.stringify(data)),
        );

        return { statusCode: 200, success: true };
      }),
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
