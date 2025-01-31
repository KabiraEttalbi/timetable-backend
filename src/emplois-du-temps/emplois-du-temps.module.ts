import { Module } from "@nestjs/common";
import { EmploiDuTempsController } from "./controllers/emploi-du-temps/emploi-du-temps.controller";
import { EmploiDuTempsService } from "./services/emploi-du-temps/emploi-du-temps.service";

@Module({
  controllers: [EmploiDuTempsController],
  providers: [EmploiDuTempsService],
})
export class EmploisDuTempsModule {}
