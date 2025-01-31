import { Module } from '@nestjs/common';
import { DepartementController } from './controllers/departement/departement.controller';
import { DepartementService } from './services/departement/departement.service';

@Module({
  controllers: [DepartementController],
  providers: [DepartementService]
})
export class DepartementsModule {}
