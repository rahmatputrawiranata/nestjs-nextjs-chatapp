import { Module } from '@nestjs/common';
import { HoroscopeService } from './horoscope.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Horoscope, HoroscopeSchema } from './horoscope.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Horoscope.name, schema: HoroscopeSchema },
    ]),
  ],
  providers: [HoroscopeService],
  exports: [HoroscopeService],
})
export class HoroscopeModule {}
