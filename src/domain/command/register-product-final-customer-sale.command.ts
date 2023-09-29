import { IProduct } from '../interfaces/model';
import { Command } from './command.abstract';

export class RegisterFinalCustomerSaleCommand extends Command<IProduct> {}
