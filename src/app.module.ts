import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module"; // Assure-toi que UserModule est importé ici
import { EmploisDuTempsModule } from "./emplois-du-temps/emplois-du-temps.module";
import { SallesModule } from "./salles/salles.module";
import { ModulesModule } from "./modules/modules.module";
import { EventsModule } from "./events/events.module";
import { NiveauxModule } from "./niveaux/niveaux.module";
import { TeachersModule } from "./teachers/teachers.module";
import { StudentsModule } from "./students/students.module";
import { OptionsModule } from "./options/options.module";
import { DepartementsModule } from "./departements/departements.module";
import { NotificationModule } from "./notification/notification.module";
import { ReservationModule } from "./reservations/reservations.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Charge les variables d'environnement
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://localhost:27017/emploi_du_temps",
    ), // Connexion à MongoDB
    AuthModule,
    UsersModule, // Assurer que UserModule est bien importé
    EmploisDuTempsModule,
    SallesModule,
    ModulesModule,
    EventsModule,
    NiveauxModule,
    OptionsModule,
    StudentsModule,
    TeachersModule,
    DepartementsModule,
    NotificationModule,
    ReservationModule,  
  ],
  controllers: [AppController],
  providers: [AppService], // Ajoute le TestService dans les providers
})
export class AppModule {}
