import { IProduct } from '../interfaces/model';
import { Command } from './command.abstract';

export class RegisterProductInventoryStockCommand extends Command<IProduct> {}