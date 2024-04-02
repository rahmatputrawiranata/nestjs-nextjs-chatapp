import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HoroscopeModule } from './horoscope/horoscope.module';
import { ZodiacModule } from './zodiac/zodiac.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        autoCreate: false,
        autoIndex: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    HoroscopeModule,
    ZodiacModule,
    UserModule,
    MessageModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, JwtService],
})
export class AppModule {}
