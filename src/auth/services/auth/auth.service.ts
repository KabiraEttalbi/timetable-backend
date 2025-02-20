/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../users/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(emailOrUsername: string, password: string): Promise<User | null> {
    // Check if the input is an email or username
    const isEmail = emailOrUsername.includes('@');
    const user = isEmail
      ? await this.userService.findByEmail(emailOrUsername)
      : await this.userService.findByUsername(emailOrUsername);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }


  async login(user: User) {
    await this.userService.update(user.id, { isAuthenticated: true });
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      user: user,
    };
  }

  async register(user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  async logout(userId: string): Promise<void> {
    await this.userService.update(userId, { isAuthenticated: false });
  }
}