import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../users/models/user.model"; // Vérifie que le chemin est correct

@Injectable()
export class TestService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    const existingUser = await this.userModel
      .findOne({ username: "oumaoum" })
      .exec();

    if (!existingUser) {
      const newUser = new this.userModel({
        nom: "ouma",
        prenom: "oum",
        email: "ouma.oum@example.com",
        username: "oumaoum",
        password: "hashed_password", // ⚠️ Assure-toi que c'est bien un hash
        isAuthenticated: true,
        role: "admin",
      });

      await newUser.save();
      console.log('Utilisateur "oumaoum" créé avec succès!');
    } else {
      console.log('Utilisateur "oumaoum" existe déjà, pas de création.');
    }
  }
}
