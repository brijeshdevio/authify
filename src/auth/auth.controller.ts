import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { apiResponse } from 'src/common';
import { SignInAuthDto } from './dto/signin-auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async handleSignUp(
    @Body() body: SignUpAuthDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.authService.signUp(body);
    return apiResponse(res, { message: 'Account created successfully!' });
  }

  @Post('signin')
  async handleSignIn(
    @Body() body: SignInAuthDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { access_token } = await this.authService.signIn(body);
    return apiResponse(res, { rest: { access_token } });
  }
}
