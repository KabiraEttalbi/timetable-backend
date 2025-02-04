import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Validate password format
  private validatePassword(password: string): void {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      );
    }
  }

  // Hash password before saving
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Create a new user
  async create(user: Partial<User>): Promise<User> {
    if (user.password) {
      this.validatePassword(user.password); // Validate password
      user.password = await this.hashPassword(user.password); // Hash password
    } else {
      throw new BadRequestException('Password is required');
    }
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Find a user by ID
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Find a user by username
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  // Update a user by ID
  async update(id: string, user: Partial<User>): Promise<User | null> {
    if (user.password) {
      this.validatePassword(user.password); // Validate password
      user.password = await this.hashPassword(user.password); // Hash password
    }
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  // Delete a user by ID
  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}