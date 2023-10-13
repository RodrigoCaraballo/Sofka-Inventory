import { IUserMongooseInterface, RegisterUserData } from '@Domain';

export class UserMongooseSeedService {
  constructor(private readonly mongooseRepository: IUserMongooseInterface) {}

  seedData(): void {
    this.mongooseRepository.countDocuments().subscribe((count) => {
      if (count === 0) {
        const superAdmin: RegisterUserData = {
          name: 'Super',
          lastName: 'Admin',
          email: 'admin@admin.com',
          password: 'admin',
          role: 'super admin',
          branchId: '1',
        };

        this.mongooseRepository.saveUser(superAdmin);
      }
    });
  }
}
