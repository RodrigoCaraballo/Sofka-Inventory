export interface IEvent {
  eventId: string;
  eventAggregateRootId: string;
  eventType: string;
  eventData: string;
  eventPublishedAt: Date;
}
