import { Command } from '@Domain';

export interface ICommandBus {
  publish(command: Command): void;
}
