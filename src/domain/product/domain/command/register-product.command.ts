import { Command } from 'src/domain/commons/domain/command/command.abstract';
import { IProduct } from '../interfaces';

export class RegisterProductCommand extends Command<IProduct> {}
