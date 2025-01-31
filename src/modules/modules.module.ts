import { Module } from "@nestjs/common";
import { ModuleController } from './controllers/module/module.controller';
import { ModuleService } from './services/module/module.service';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService]
})
export class ModulesModule {}
