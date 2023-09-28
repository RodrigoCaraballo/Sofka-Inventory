import { Command } from 'src/domain/commons/domain/command/command.abstract';
import { IProduct } from '../interfaces';

export class RegisterFinalCustomerSaleCommand extends Command<IProduct> {}
