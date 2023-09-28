import { Command } from 'src/domain/commons/domain/command/command.abstract';
import { IBranch } from '../interfaces';

export class RegisterBranchCommand extends Command<IBranch> {}
