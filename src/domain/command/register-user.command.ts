import { IUser } from '../interfaces/model';
import { Command } from './command.abstract';

export class RegisterUserCommand extends Command<IUser> {
  constructor(eventData: IUser) {
    super('USER_REGISTERED', eventData);
  }
}
