import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Horoscope {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export type HoroscopeDocument = HydratedDocument<Horoscope>;
export const HoroscopeSchema = SchemaFactory.createForClass(Horoscope);
