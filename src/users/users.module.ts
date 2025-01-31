import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user.model";
import { TestService } from "../test/test.service";
import { UserController } from "./controllers/user/user.controller";
import { UserService } from "./services/user/user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Déclare UserModel
  ],
  providers: [TestService, UserService], // Ajoute TestService ici
  exports: [MongooseModule, TestService],
  controllers: [UserController], // Exporte MongooseModule pour qu'il soit disponible dans d'autres modules
})
export class UsersModule {}
