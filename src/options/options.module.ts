import { Module } from "@nestjs/common";
import { OptionController } from './controllers/option/option.controller';

@Module({
  controllers: [OptionController]
})
export class OptionsModule {}
