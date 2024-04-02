import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['male', 'female', 'other', 'prefer not to say'] })
  gender: string;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  zodiac: string;

  @Prop({ required: true })
  horoscope: string;

  @Prop()
  imageProfileBase64?: string;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ type: Object })
  @Prop({ required: true })
  password: string;

  @Prop({ type: Profile })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
