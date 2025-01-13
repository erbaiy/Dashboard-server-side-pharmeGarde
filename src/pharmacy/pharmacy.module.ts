import { Module } from '@nestjs/common';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { Pharmacy,PharmacySchema } from './pharmacy.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pharmacy.name, schema:PharmacySchema }])],
  controllers: [PharmacyController],
  providers: [PharmacyService]
})
export class PharmacyModule {}
