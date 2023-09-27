import { InjectRepository } from '@nestjs/typeorm';
import { IEvent } from 'src/domain/commons/domain/interface/event.interface';
import { Repository } from 'typeorm';
import { IEventRepository } from '../../../domain/interface/event.interface.repository';
import { EventTypeOrmEntity } from '../model/event.typeorm.entity';

export class EventTypeOrmRepository implements IEventRepository {
  constructor(
    @InjectRepository(EventTypeOrmEntity)
    private readonly eventRepository: Repository<EventTypeOrmEntity>,
  ) {}

  saveEvent(event: IEvent): void {
    this.eventRepository.save(event);
  }
}
