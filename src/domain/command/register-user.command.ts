import { IUser } from '../interfaces/model';
import { Command } from './command.abstract';

export class RegisterUserCommand extends Command<IUser> {}
