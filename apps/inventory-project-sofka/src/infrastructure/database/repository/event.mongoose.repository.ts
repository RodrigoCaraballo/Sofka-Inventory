import {
  IEvent,
  IEventRepository,
  RegisterBranchData,
  RegisterProductData,
  RegisterUserData,
} from '@Domain';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import {
  EventMongoose,
  EventMongooseDocument,
} from '../model/event.mongoose.document';

export class EventMongooseRepository implements IEventRepository {
  constructor(
    @InjectModel(EventMongoose.name)
    private readonly eventRepository: Model<EventMongooseDocument>,
  ) {}
  saveEvents(events: IEvent[]): void {
    throw new Error('Method not implemented.');
  }
  findProducts(
    branchId: string,
    productIds: string[],
  ): Observable<EventMongooseDocument[]> {
    return from(
      this.eventRepository
        .aggregate([
          {
            $match: {
              eventAggregateRootId: branchId,
              eventType: 'PRODUCT_UPDATED',
              'eventData.id': { $in: productIds },
            },
          },
          {
            $sort: { eventPublishedAt: -1 },
          },
          {
            $group: {
              _id: '$eventData.id',
              latestEvent: { $first: '$$ROOT' },
            },
          },
          {
            $replaceRoot: { newRoot: '$latestEvent' },
          },
        ])
        .exec(),
    );
  }

  saveEvent(event: IEvent): void {
    this.eventRepository.create(event);
  }

  existBranch(branch: RegisterBranchData): Observable<EventMongooseDocument> {
    return from(
      this.eventRepository
        .findOne({
          eventType: 'BRANCH_REGISTERED',
          'eventData.name': branch.name,
          'eventData.country': branch.country,
          'eventData.city': branch.city,
        })
        .exec(),
    );
  }

  existUser(user: RegisterUserData): Observable<EventMongooseDocument> {
    return from(
      this.eventRepository.findOne({
        eventType: 'USER_REGISTERED',
        'eventData.email': user.email,
      }),
    );
  }

  existProduct(
    product: RegisterProductData,
  ): Observable<EventMongooseDocument> {
    return from(
      this.eventRepository.findOne({
        eventAggregateRootId: product.branchId,
        eventType: 'PRODUCT_REGISTERED',
        'eventData.name': product.name,
      }),
    );
  }

  findProduct(
    branchId: string,
    productId: string,
  ): Observable<EventMongooseDocument> {
    return from(
      this.eventRepository
        .findOne({
          eventAggregateRootId: branchId,
          'eventData.id': productId,
        })
        .sort({ eventPublishedAt: -1 }),
    );
  }
}
