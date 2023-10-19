import {
  IEvent,
  IEventRepository,
  RegisterBranchData,
  RegisterProductData,
} from '@Domain';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, catchError, from } from 'rxjs';
import { AuthData } from '../../../../../domain/interfaces/event-data/auth.data';
import {
  EventMongoose,
  EventMongooseDocument,
} from '../model/event.mongoose.document';

@Injectable()
export class EventMongooseRepository implements IEventRepository {
  constructor(
    @InjectModel(EventMongoose.name)
    private readonly eventRepository: Model<EventMongooseDocument>,
  ) {}

  authUser(auth: AuthData): Observable<EventMongooseDocument> {
    return from(
      this.eventRepository.findOne({
        'eventData.email': auth.email,
        'eventData.password': auth.password,
      }),
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
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
              $or: [
                {
                  eventType: 'PRODUCT_UPDATED',
                  'eventData.id': { $in: productIds },
                },
                {
                  eventType: 'PRODUCT_REGISTERED',
                  'eventData.id': { $in: productIds },
                },
              ],
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
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
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
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  existUser(email: string): Observable<EventMongooseDocument> {
    return from(
      this.eventRepository.findOne({
        eventType: 'USER_REGISTERED',
        'eventData.email': email,
      }),
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
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
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
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
    ).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  countDocuments(): Observable<number> {
    return from(this.eventRepository.countDocuments().exec()).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
