import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Zodiac {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export type ZodiacDocument = HydratedDocument<Zodiac>;
export const ZodiacSchema = SchemaFactory.createForClass(Zodiac);
