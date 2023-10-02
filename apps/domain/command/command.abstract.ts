export abstract class Command {
  eventAggregateRootId: string;
  readonly eventType: string;
  eventData: string;

  constructor(
    eventAggregateRootId: string,
    eventType: string,
    eventData: string,
  ) {
    this.eventAggregateRootId = eventAggregateRootId;
    this.eventType = eventType;
    this.eventData = eventData;
  }
}
