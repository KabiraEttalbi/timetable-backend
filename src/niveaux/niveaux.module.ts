import { Module } from "@nestjs/common";
import { NiveauController } from './controllers/niveau/niveau.controller';
@Module({
  controllers: [NiveauController]
})
export class NiveauxModule {}
