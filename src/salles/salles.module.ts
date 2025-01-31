import { Module } from "@nestjs/common";
import { SalleController } from './controllers/salle/salle.controller';
import { SalleService } from './services/salle/salle.service';

@Module({
  controllers: [SalleController],
  providers: [SalleService]
})
export class SallesModule {}
