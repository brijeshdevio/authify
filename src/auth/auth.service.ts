import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { User } from 'src/user/schemas/user.schema';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpAuthDto: SignUpAuthDto) {
    signUpAuthDto.password = await argon2.hash(signUpAuthDto.password);
    try {
      await this.userModel.create(signUpAuthDto);
      return;
    } catch (error: unknown) {
      const CONFLICT_CODE = 11000;
      const err = error as { code: number };
      if (err?.code === CONFLICT_CODE) {
        throw new ConflictException('Email already exists.');
      }
      throw error;
    }
  }

  async signIn(signInAuthDto: SignInAuthDto) {
    const user = await this.userModel.findOne({ email: signInAuthDto.email });
    if (!user || !user._id) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await argon2.verify(
      user.password,
      signInAuthDto.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    user.lastLogin = new Date();
    await user.save();
    const payload = { id: user._id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
  }
}
