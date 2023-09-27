import { IEvent } from './event.interface';

export interface IEventRepository {
  saveEvent(event: IEvent): void;
}
