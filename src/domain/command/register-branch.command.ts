import { IBranch } from '../interfaces/model';
import { Command } from './command.abstract';

export class RegisterBranchCommand extends Command<IBranch> {}
