export interface IEvent {
  eventId?: string;
  eventAggregateRootId: string;
  eventType: string;
  eventData: Record<string, any>;
  eventPublishedAt: Date;
}
