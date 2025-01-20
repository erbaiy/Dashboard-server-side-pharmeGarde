import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// console.log('kdkkdkdk',process.env.MONGO_URI)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://bouhamidisal:m3d8wq80tzClhhCp@pharmfuadeclosure.ujs6x.mongodb.net/PharmGarde',
    ),
    UserModule, PharmacyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
