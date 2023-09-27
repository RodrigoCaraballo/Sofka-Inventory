import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Event')
export class EventTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  eventId: string;

  @Column()
  eventType: string;

  @Column()
  eventData: string;

  @Column()
  eventPublishedAt: Date;
}
