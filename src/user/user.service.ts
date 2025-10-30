import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async profile(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .lean();
    if (!user || !user._id) {
      throw new UnauthorizedException('You are not logged in');
    }
    return user;
  }
}
