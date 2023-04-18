import { Injectable } from '@nestjs/common';
import { WorkSheet, read, utils } from 'xlsx';

@Injectable()
export class XlxsParserService {
  parse<Row>(file: Express.Multer.File): Row[] {
    return utils.sheet_to_json<Row>(this.getSheet(file), {
      blankrows:  false,
      rawNumbers: true
    });
  }
  private getSheet(file: Express.Multer.File): WorkSheet {
    const wb = read(file.buffer, { type: 'buffer', raw: true });
    return wb.Sheets[wb.SheetNames[0]];
  }
}