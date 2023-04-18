import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OpenAIService } from "./openai.service";
import { ScheduleModule } from "@nestjs/schedule";
import { ImportsModule } from './import/import.module';

@Module({
  imports: [ScheduleModule.forRoot(), ImportsModule],
  controllers: [AppController],
  providers: [AppService, OpenAIService],
})
export class AppModule {}
