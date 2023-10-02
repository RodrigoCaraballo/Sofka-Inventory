import { IEvent } from '../model';

export interface IEventRepository {
  saveEvent(event: IEvent): void;
}
