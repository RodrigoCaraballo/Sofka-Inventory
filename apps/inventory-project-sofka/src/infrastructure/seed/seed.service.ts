import { IEvent, IEventRepository } from '@Domain';

export class EventMongooseSeedService {
  constructor(private readonly mongooseRepository: IEventRepository) {}

  seedData(): void {
    this.mongooseRepository.countDocuments().subscribe((count) => {
      if (count === 0) {
        const superAdmin: IEvent = {
          eventAggregateRootId: '1',
          eventType: 'USER_REGISTERED',
          eventData: {
            name: 'Super',
            lastName: 'Admin',
            email: 'admin@admin.com',
            password: 'admin',
            role: 'super admin',
          },
          eventPublishedAt: new Date(),
        };

        this.mongooseRepository.saveEvent(superAdmin);
      }
    });
  }
}
