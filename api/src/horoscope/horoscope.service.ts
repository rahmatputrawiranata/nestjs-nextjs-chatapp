import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Horoscope } from './horoscope.schema';
import { Model } from 'mongoose';
import { HoroscopeDTO } from './dto/horoscope.dto';

@Injectable()
export class HoroscopeService {
  constructor(
    @InjectModel(Horoscope.name) private horoscopeModel: Model<Horoscope>,
  ) {}

  async findHoroscopeByDate(date: Date): Promise<HoroscopeDTO> {
    const year2022Date = new Date(date).setFullYear(2022);
    return this.horoscopeModel.findOne({
      startDate: {
        $lte: year2022Date,
      },
      endDate: {
        $gte: year2022Date,
      },
    });
  }
}
