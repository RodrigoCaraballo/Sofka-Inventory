import { IProduct } from '../interfaces/model';
import { Command } from './command.abstract';

export class RegisterProductResellerSaleCommand extends Command<IProduct> {}
