import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pharmacy, PharmacyDocument } from './pharmacy.schema';
import { CreatePharmacyDto } from './Dtos/create-pharmacy.dto';
import { UpdatePharmacyDto } from './Dtos/update-pharmacy.dto';

@Injectable()
export  class PharmacyService {
  constructor(
    @InjectModel(Pharmacy.name) private readonly pharmacyModel: Model<PharmacyDocument>,
  ) { }

  async create(createPharmacyDto: CreatePharmacyDto): Promise<Pharmacy | string> {
    try {
      const existingPharmacy = await this.pharmacyModel
        .findOne({ name: createPharmacyDto.name, address: createPharmacyDto.address,longitude: createPharmacyDto.longitude,latitude: createPharmacyDto.latitude })
        .exec();

      if (existingPharmacy) {
        throw new ConflictException('A pharmacy with those information already exists');
      }
      const newPharmacy = new this.pharmacyModel(createPharmacyDto);
      return await newPharmacy.save();
    } catch (e) {
      console.log('opssss', e);
       throw new Error(e);  
      }
  }

  async findAll(): Promise<Pharmacy[] | string> {
    try {
      return await this.pharmacyModel.find().exec();

    } catch (e) {
      console.log('opssss', e);
      return 'ops smth went wrong '
    }
  }

  async findOne(id: string): Promise<Pharmacy | string> {
    try {
      const pharmacy = await this.pharmacyModel.findById(id).exec();
      if (!pharmacy) {
        throw new NotFoundException('pharmacy not found');
      }
      return pharmacy;
    } catch (e) {
      console.log('errorrr', e)
      return 'ops smth went wrong'
    }

  }


  async update(id: string, updatePharmacyDto: UpdatePharmacyDto): Promise<Pharmacy | string> {
    try {
      const updatedPharmacy = await this.pharmacyModel.findByIdAndUpdate(id, updatePharmacyDto, { new: true }).exec();
      if (!updatedPharmacy) {
        throw new NotFoundException(`pharmacy  not found`);
      }
      return updatedPharmacy;
    } catch (e) {
      console.log('errorrr', e)
      return 'ops smth went wrong'
    }

  }

  async remove(id: string): Promise<string> {
    try {
      const isexist = await this.pharmacyModel.findById(id);
      if(!isexist){
        return 'pharmacy not found'
      }
      const deletedPharmacy = await this.pharmacyModel.findByIdAndDelete(id).exec();
      if (!deletedPharmacy) {
        throw new NotFoundException(`pharmacy not found`);
      }
      return 'pharmacy was deleted successfully'
    }catch(e){
      console.log('errorrr', e)
      return 'ops smth went wrong'
    }
    }

  
}
