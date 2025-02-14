import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Departement, DepartementSchema } from './models/departement.model';
import { DepartementService } from './services/departement/departement.service';
import { DepartementController } from './controllers/departement/departement.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Departement.name, schema: DepartementSchema },
    ]),
  ],
  controllers: [DepartementController],
  providers: [DepartementService],
  exports: [DepartementService],
})
export class DepartementsModule {}
