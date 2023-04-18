import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ImportController } from './controller';
import { XlxsParserService } from './xlxs-parser.service';
import { OpenAIService } from '../openai.service';

@Module({
  imports:     [CsvModule],
  controllers: [ImportController],
  providers:   [
    XlxsParserService,
    OpenAIService
  ],
  exports: [XlxsParserService]
})
export class ImportsModule {}
