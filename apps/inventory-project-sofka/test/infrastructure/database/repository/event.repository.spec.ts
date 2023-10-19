import { IEvent } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { lastValueFrom, of } from 'rxjs';
import {
  EventMongoose,
  EventMongooseDocument,
  EventMongooseRepository,
} from '../../../../src/infrastructure/database';

describe('Event Mongoose Repository', () => {
  let eventRepository: EventMongooseRepository;
  let eventModel: Model<EventMongooseDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventMongooseRepository,
        {
          provide: getModelToken(EventMongoose.name),
          useValue: {
            findOne: jest.fn(),
            aggregate: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            countDocuments: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    eventRepository = module.get<EventMongooseRepository>(
      EventMongooseRepository,
    );
    eventModel = module.get<Model<EventMongooseDocument>>(
      getModelToken(EventMongoose.name),
    );
  });

  describe('saveEvent', () => {
    test('should save and return the saved model', async () => {
      const event: IEvent = {
        eventAggregateRootId: '1',
        eventType: 'EVENT',
        eventData: { data: 'data' },
        eventPublishedAt: new Date(),
      };

      const result = eventRepository.saveEvent(event);
      expect(jest.spyOn(eventModel, 'create')).toHaveBeenCalledWith(event);
    });
  });

  describe('findProducts', () => {
    test('should return an array of events about products', async () => {
      const branchId = '1';
      const eventData = ['2'];

      const events: IEvent[] = [
        {
          eventAggregateRootId: '1',
          eventType: 'PRODUCT_UPDATED',
          eventData: { eventData: { id: '2' } },
          eventPublishedAt: new Date(),
        },
        {
          eventAggregateRootId: '2',
          eventType: 'PRODUCT_REGISTERED',
          eventData: { eventData: { id: '2' } },
          eventPublishedAt: new Date(),
        },
      ];

      const expected = {
        eventAggregateRootId: '2',
        eventType: 'PRODUCT_REGISTERED',
        eventData: { eventData: { id: '2' } },
        eventPublishedAt: new Date(),
      };

      const aggregateSpy = jest.spyOn(eventModel, 'aggregate');
      const execSpy = jest.fn().mockReturnValue(events);

      aggregateSpy.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = eventRepository.findProducts(branchId, eventData);
      const resultPromise = lastValueFrom(result);

      expect(await resultPromise).toEqual(expected);
    });

    test('should return an empty array if not get a result', async () => {
      const branchId = '1';
      const eventData = ['3'];

      const aggregateSpy = jest.spyOn(eventModel, 'aggregate');
      const execSpy = jest.fn().mockReturnValue([{}]);

      aggregateSpy.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = eventRepository.findProducts(branchId, eventData);
      const resultPromise = lastValueFrom(result);

      expect(await resultPromise).toEqual({});
    });

    test('should return an error', async () => {
      const branchId = '1';
      const eventData = ['2'];

      const aggregateSpy = jest.spyOn(eventModel, 'aggregate');
      const execSpy = jest
        .fn()
        .mockRejectedValue(
          new InternalServerErrorException('Something went wrong'),
        );

      aggregateSpy.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = eventRepository.findProducts(branchId, eventData);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('authUser', () => {
    test('should return an event with about user', async () => {
      const data = {
        email: 'email@example.com',
        password: 'password',
      };

      const expected = {
        eventAggregateRootId: '2',
        eventType: 'USER_REGISTERED',
        eventData: {
          eventData: { email: 'email@example.com', password: 'password' },
        },
        eventPublishedAt: new Date(),
      };

      jest.spyOn(eventModel, 'findOne').mockReturnValue(of(expected) as any);

      const result = eventRepository.authUser(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an empty event when not user equal to entry data', async () => {
      const data = {
        email: 'email@example.com',
        password: 'password',
      };

      const expected = {};

      jest.spyOn(eventModel, 'findOne').mockReturnValue(of(expected) as any);

      const result = eventRepository.authUser(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error when something fails', async () => {
      const data = {
        email: 'email@example.com',
        password: 'password',
      };

      const expected = new InternalServerErrorException('Something went wrong');

      jest.spyOn(eventModel, 'findOne').mockRejectedValue(expected);

      const result = eventRepository.authUser(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('existBranch', () => {
    test('should return an event of branch', async () => {
      const data = {
        name: 'foo',
        country: 'bar',
        city: 'baz',
      };

      const expected = {
        eventAggregateRootId: '2',
        eventType: 'BRANCH_REGISTERED',
        eventData: {
          eventData: {
            name: 'foo',
            country: 'bar',
            city: 'baz',
          },
        },
        eventPublishedAt: new Date(),
      };

      const findOne = jest.spyOn(eventModel, 'findOne');
      const execSpy = jest.fn().mockReturnValue(of(expected));

      findOne.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = eventRepository.existBranch(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an empty result when branch dont exist', async () => {
      const data = {
        name: 'foo',
        country: 'bar',
        city: 'baz',
      };

      const expected = {};

      const findOne = jest.spyOn(eventModel, 'findOne');
      const execSpy = jest.fn().mockReturnValue(of(expected));

      findOne.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = eventRepository.existBranch(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error when something fails', async () => {
      const data = {
        name: 'foo',
        country: 'bar',
        city: 'baz',
      };

      const expected = new InternalServerErrorException('Something went wrong');

      const findOne = jest.spyOn(eventModel, 'findOne');
      const execSpy = jest
        .fn()
        .mockRejectedValue(
          new InternalServerErrorException('Something went wrong'),
        );

      findOne.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = eventRepository.existBranch(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('existProduct', () => {
    test('should return an event of user', async () => {
      const data = {
        email: 'foo',
      };

      const expected = {
        eventAggregateRootId: '2',
        eventType: 'PRODUCT_REGISTERED',
        eventData: {
          eventData: {
            email: 'foo',
          },
        },
        eventPublishedAt: new Date(),
      };

      jest.spyOn(eventModel, 'findOne').mockReturnValue(of(expected) as any);

      const result = eventRepository.existUser(data.email);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an empty result when user dont exist', async () => {
      const data = {
        email: 'foo',
      };

      const expected = {};

      jest.spyOn(eventModel, 'findOne').mockReturnValue(of(expected) as any);

      const result = eventRepository.existUser(data.email);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error when something fails', async () => {
      const data = {
        email: 'foo',
      };

      const expected = new InternalServerErrorException('Something went wrong');

      jest.spyOn(eventModel, 'findOne').mockRejectedValue(expected);

      const result = eventRepository.existUser(data.email);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('existProduct', () => {
    test('should return an event of product', async () => {
      const data = {
        branchId: '1',
        name: 'foo',
        description: 'description',
        price: 100,
        inventoryStock: 2,
        category: 'Others',
        id: '1',
      };

      const expected = {
        eventAggregateRootId: '2',
        eventType: 'PRODUCT_REGISTERED',
        eventData: {
          eventData: {
            branchId: '1',
            name: 'foo',
          },
        },
        eventPublishedAt: new Date(),
      };

      jest.spyOn(eventModel, 'findOne').mockReturnValue(of(expected) as any);

      const result = eventRepository.existProduct(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an empty result when branch dont exist', async () => {
      const data = {
        branchId: '1',
        name: 'foo',
        description: 'description',
        price: 100,
        inventoryStock: 2,
        category: 'Others',
        id: '1',
      };

      const expected = {};

      jest.spyOn(eventModel, 'findOne').mockReturnValue(of(expected) as any);

      const result = eventRepository.existProduct(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error when something fails', async () => {
      const data = {
        branchId: '1',
        name: 'foo',
        description: 'description',
        price: 100,
        inventoryStock: 2,
        category: 'Others',
        id: '1',
      };

      const expected = new InternalServerErrorException('Something went wrong');

      jest.spyOn(eventModel, 'findOne').mockRejectedValue(expected);

      const result = eventRepository.existProduct(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findProduct', () => {
    test('should return an event of one product', async () => {
      const branchId = '2';
      const eventData = '2';

      const data = {
        eventAggregateRootId: '2',
        eventType: 'PRODUCT_REGISTERED',
        eventData: { eventData: { id: '2' } },
        eventPublishedAt: new Date(),
      };

      const expected = {
        eventAggregateRootId: '2',
        eventType: 'PRODUCT_REGISTERED',
        eventData: { eventData: { id: '2' } },
        eventPublishedAt: new Date(),
      };

      const findSpy = jest.spyOn(eventModel, 'findOne');
      const sortSpy = jest.fn().mockReturnValue(of(expected) as any);

      findSpy.mockReturnValue({
        sort: sortSpy,
      } as any);

      const result = eventRepository.findProduct(branchId, eventData);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an empty result when product dont exist', async () => {
      const branchId = '2';
      const eventData = '2';

      const expected = {};

      const findSpy = jest.spyOn(eventModel, 'findOne');
      const sortSpy = jest.fn().mockReturnValue(of(expected) as any);

      findSpy.mockReturnValue({
        sort: sortSpy,
      } as any);

      const result = eventRepository.findProduct(branchId, eventData);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error when something fails', async () => {
      const branchId = '2';
      const eventData = '2';

      const expected = new InternalServerErrorException('Something went wrong');

      const findSpy = jest.spyOn(eventModel, 'findOne');
      const sortSpy = jest.fn().mockRejectedValue(of(expected) as any);

      findSpy.mockReturnValue({
        sort: sortSpy,
      } as any);

      const result = eventRepository.findProduct(branchId, eventData);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findProduct', () => {
    test('should return a number of total docuements into schema', async () => {
      const expected = 1;

      const findSpy = jest.spyOn(eventModel, 'countDocuments');
      const execSpy = jest.fn().mockReturnValue(of(expected) as any);

      findSpy.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = eventRepository.countDocuments();

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error when something fails', async () => {
      const expected = new InternalServerErrorException('Something went wrong');

      const findSpy = jest.spyOn(eventModel, 'countDocuments');
      const execSpy = jest.fn().mockRejectedValue(of(expected) as any);

      findSpy.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = eventRepository.countDocuments();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
