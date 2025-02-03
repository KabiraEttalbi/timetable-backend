import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]), // Declare UserModel
  ],
  providers: [UserService], // Add UserService here
  controllers: [UserController], // Add UserController here
  exports: [UserService], // Export MongooseModule and UserService
})
export class UsersModule {}