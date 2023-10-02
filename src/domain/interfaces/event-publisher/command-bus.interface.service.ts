import { Command } from '@Command';

export interface ICommandBus {
  publish(command: Command): void;
}
