/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { CreateUserDto } from '../../../users/dto/create-user.dto';
import { LoginUserDto } from '../../../users/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, username, password } = loginUserDto;

    // Ensure either email or username is provided
    if (!email && !username) {
      throw new UnauthorizedException('Email or username is required');
    }

    const user = await this.authService.validateUser((email || username) as string, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt')) // Protect the route with JWT
  async logout(@Request() req) {
    const userId = req.user.sub; // Extract user ID from the JWT payload
    await this.authService.logout(userId);
    return { message: 'Logged out successfully' };
  }
}