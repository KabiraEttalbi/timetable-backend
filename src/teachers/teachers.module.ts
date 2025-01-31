import { Module } from "@nestjs/common";
import { TecherController } from "./controllers/techer/techer.controller";
@Module({
  controllers: [TecherController],
})
export class TeachersModule {}
