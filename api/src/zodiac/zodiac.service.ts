import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Zodiac } from './zodiac.schema';
import { Model } from 'mongoose';
import { ZodiacDTO } from './dto/zodiac.dto';

@Injectable()
export class ZodiacService {
  constructor(@InjectModel(Zodiac.name) private zodiacModel: Model<Zodiac>) {}

  async findZodiacByDate(date: Date): Promise<ZodiacDTO> {
    return this.zodiacModel.findOne({
      startDate: {
        $lte: date,
      },
      endDate: {
        $gte: date,
      },
    });
  }
}
