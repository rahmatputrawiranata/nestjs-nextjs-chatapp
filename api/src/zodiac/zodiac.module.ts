import { Module } from '@nestjs/common';
import { ZodiacService } from './zodiac.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Zodiac, ZodiacSchema } from './zodiac.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Zodiac.name, schema: ZodiacSchema }]),
  ],
  providers: [ZodiacService],
  exports: [ZodiacService],
})
export class ZodiacModule {}
