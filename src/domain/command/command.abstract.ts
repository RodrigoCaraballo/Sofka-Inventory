export abstract class Command<T> {
  eventType?: string;
  eventData: T;
  constructor(eventData: T, eventType?: string) {
    this.eventData = eventData;
    this.eventType = eventType;
  }
}
