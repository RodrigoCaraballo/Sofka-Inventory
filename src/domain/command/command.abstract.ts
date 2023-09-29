export abstract class Command<T> {
  readonly eventType: string;
  eventData: T;

  constructor(eventType: string, eventData: T) {
    this.eventType = eventType;
    this.eventData = eventData;
  }
}
