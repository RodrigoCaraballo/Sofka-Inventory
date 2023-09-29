import { IProduct } from '../interfaces/model';
import { Command } from './command.abstract';

export class RegisterProductCommand extends Command<IProduct> {}
