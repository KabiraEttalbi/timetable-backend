import { Module } from "@nestjs/common";
import { OptionController } from './controllers/option/option.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { OptionSchema, Option } from "./models/option.model";
import { Departement, DepartementSchema } from "src/departements/models/departement.model";
import { OptionService } from "./services/option/option.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Option.name, schema: OptionSchema },
      { name: Departement.name, schema: DepartementSchema },
    ]),
  ],
  controllers: [OptionController],
  providers: [OptionService],
})

export class OptionsModule {}
