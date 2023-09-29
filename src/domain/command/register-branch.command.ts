import { Command } from './command.abstract';

export class RegisterBranchCommand extends Command {
  constructor(eventAggrateRootId: string, eventData: string) {
    super(eventAggrateRootId, 'BRANCH_REGISTERED', eventData);
  }
}
