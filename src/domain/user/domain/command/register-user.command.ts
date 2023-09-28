import { Command } from 'src/domain/commons/domain/command/command.abstract';
import { IUser } from '../interfaces';

export class RegisterUserCommand extends Command<IUser> {}
